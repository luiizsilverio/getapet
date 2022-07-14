const Yup = require('yup');
const Pet = require('../models/Pet');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');


const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  age: Yup.number().required("Idade é obrigatória"),
  weight: Yup.number().required('Peso é obrigatório'),
  color: Yup.string().required('Cor é obrigatória')
})

module.exports = class PetController {

  static async getAll(req, res) {
    const pets = await Pet.find().sort('-createdAt').lean();
    return res.status(200).json({ pets });
  }

  static async create(req, res) {
    const { name, age, weight, color } = req.body;

    // validations

    try {
      await schema.validate(req.body, {
        abortEarly: false
      })

    } catch (error) {
      return res.status(422).json({ error: error.errors });
    }

    // image upload
    const images = req.files;

    if (images.length === 0) {
      return res.status(422).json({ error: "Imagem é obrigatória"});
    }

    // get pet owner
    const token = getToken(req);
    const user = await getUserByToken(token);

    // create a pet
    const pet = new Pet({
      name,
      age,
      weight,
      color,
      available: true,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone
      }
    })

    images.map(image => {
      pet.images.push(image.filename);
    })

    try {
      const newPet = await pet.save();
      res.status(201).json(newPet);

    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
}
