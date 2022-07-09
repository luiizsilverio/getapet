const Yup = require('yup')
const bcrypt = require('bcrypt')
const User = require('../models/User');
const createUserToken = require('../helpers/create-user-token');

module.exports = class UserController {

  static async register(req, res) {
    const { name, email, phone, password, confirmPassword } = req.body;

    // validations

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string().email("E-mail inválido")
          .required('E-mail é obrigatório'),
        phone: Yup.string().required('Telefone é obrigatório'),
        password: Yup.string().required('Senha não informada')
          .min(4, "Senha deve ter no mínimo 4 letras"),
        confirmPassword: Yup.string().required('Senha incorreta')
      })

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
}
