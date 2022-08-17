const Yup = require('yup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

const schemaNew = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email("E-mail inválido")
    .required('E-mail é obrigatório'),
  phone: Yup.string().required('Telefone é obrigatório'),
  password: Yup.string().required('Senha não informada')
    .min(4, "Senha deve ter no mínimo 4 letras"),
  confirmPassword: Yup.string().required('Senha incorreta')
})

const schemaEdit = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email("E-mail inválido")
    .required('E-mail é obrigatório'),
  phone: Yup.string().required('Telefone é obrigatório')
})

module.exports = class UserController {

  static async register(req, res) {
    const { name, email, phone, password, confirmPassword } = req.body;

    // user validations

    try {
      await schemaNew.validate(req.body, {
        abortEarly: false
      })

      if (password !== confirmPassword) {
        return res.status(422).json({ error: 'Senhas não conferem'});
      }

    } catch (error) {
      return res.status(422).json({ error: error.errors });
    }

    // check if user exists
    const userExists = await User.findOne({email: email});

    if (userExists) {
      return res.status(400).json({ error: 'E-mail já está sendo utilizado'});
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
      return res.status(404).json({ error: 'Usuário não cadastrado'});
    }

    // check if password match
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(401).json({ error: 'Senha inválida'});
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
      return res.status(404).json({ error: 'Usuário não cadastrado'});
    }

    res.status(200).json({ user });
  }

  static async getAllUsers(req, res) {
    const users = await User.find().select('-password');

    res.status(200).json(users || {});
  }

  static async editUser(req, res) {
    const { id } = req.params;
    const { name, email, phone, password, confirmPassword } = req.body;

    // user validations

    try {
      await schemaEdit.validate(req.body, {
        abortEarly: false
      })

      if (password && password !== confirmPassword) {
        return res.status(422).json({ error: 'Senhas não conferem'});
      }

    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    // check if user exists

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user) {
      return res.status(422).json({ error: 'Usuário não cadastrado' });
    }

    const emailExists = await User.findOne({email: email});

    if (emailExists && user.email !== email) {
      return res.status(403).json({ error: 'E-mail já foi cadastrado' });
    }

    // create a password

    if (password) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);
      user.password = passwordHash;
    }

    const image = req.file?.filename || '';

    user.name = name;
    user.email = email;
    user.phone = phone;
    user.image = image;

    try {
      await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      )

      res.status(200).json({ message: "Usuário atualizado com sucesso" });

    } catch (err) {
      return res.status(500).json({ error: error.errors });
    }
  }
}
