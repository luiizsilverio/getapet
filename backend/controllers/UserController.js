const Yup = require('yup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email("E-mail inválido")
    .required('E-mail é obrigatório'),
  phone: Yup.string().required('Telefone é obrigatório'),
  password: Yup.string().required('Senha não informada')
    .min(4, "Senha deve ter no mínimo 4 letras"),
  confirmPassword: Yup.string().required('Senha incorreta')
})

module.exports = class UserController {

  static async register(req, res) {
    const { name, email, phone, password, confirmPassword } = req.body;

    // user validations

    try {
      await schema.validate(req.body, {
        abortEarly: false
      })

      if (password !== confirmPassword) {
        res.status(422).json({ error: 'Senhas não conferem'});
        return;
      }

    } catch (error) {
      res.status(400).json({ error: error.errors });
      return;
    }

    // check if user exists
    const userExists = await User.findOne({email: email});

    if (userExists) {
      res.status(400).json({ error: 'E-mail já está sendo utilizado'})
      return;
    }

    // create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash
    })

    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);
      // return res.json({ message: "Usuário criado com sucesso", _id: newUser._id });

    } catch(error) {
      res.status(500).json({ error });
    }
  }

  static async login(req, res) {
    const {email, password} = req.body;

    // validations
    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório'});
      return;
    }
    if (!password) {
      res.status(422).json({ message: 'Senha não informada'});
      return;
    }

    // check if user exists
    const user = await User.findOne({email: email});

    if (!user) {
      res.status(404).json({ error: 'Usuário não cadastrado'});
      return;
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      res.status(401).json({ error: 'Senha inválida'});
      return;
    }

    // generate jwt token
    await createUserToken(user, req, res);
  }

  static async checkUser(req, res) {
    let currentUser

    if (req.headers.authorization) {
      const token = getToken(req);
      const decoded = jwt.verify(token, 'secret');

      currentUser = await User.findById(decoded.id);
      currentUser.password = undefined;

    } else {
      currentUser = null;
    }

    res.status(200).send(currentUser);
  }

  static async getUserById(req, res) {
    const { id } = req.params;

    const user = await User.findById(id).select('-password');

    if (!user) {
      res.status(404).json({ error: 'Usuário não cadastrado'});
      return;
    }

    res.status(200).json({ user });
  }

  static async editUser(req, res) {
    const { id } = req.params;
    const { name, email, phone, password, confirmPassword } = req.body;
    let image = '';

    // user validations

    try {
      await schema.validate(req.body, {
        abortEarly: false
      })

      if (password !== confirmPassword) {
        res.status(422).json({ error: 'Senhas não conferem'});
        return;
      }

    } catch (error) {
      res.status(400).json({ error: error.errors });
      return;
    }

    // check if user exists

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      res.status(422).json({ error: 'Usuário não cadastrado' });
      return;
    }

    const emailExists = await User.findOne({email: email});

    if (emailExists && user.email !== email) {
      res.status(403).json({ error: 'E-mail já foi cadastrado' });
      return;
    }

    // create a password

    if (password) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
      user.password = passwordHash;
    }

    user.name = name;
    user.email = email;
    user.phone = phone;

    try {
      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      )

      res.status(200).json({ message: "Usuário atualizado com sucesso" });

    } catch (err) {
      res.status(500).json({ error: error.errors });
      return;
    }

  }
}
