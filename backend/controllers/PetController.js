const Yup = require('yup');
const Pet = require('../models/Pet');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const ObjectId = require('mongoose').Types.ObjectId;

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

  static async getAvailable(req, res) {
    const pets = await Pet.find({ available: true }).sort('-createdAt').lean();
    return res.status(200).json({ pets });
  }

  static async getPetById(req, res) {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ error: 'Id inválido'});
    }

    const pet = await Pet.findOne({_id: id})

    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }

    return res.status(200).json({ pet });
  }

  static async getUserPets(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt');

    res.status(200).json({ pets });
  }

  static async getUserAdoptions(req, res) {
    const token = getToken(req);
    const user = await getUserByToken(token);

    const pets = await Pet.find({ 'adopter._id': user._id }).sort('-createdAt');

    res.status(200).json({ pets });
  }

  static async create(req, res) {
    const { name, age, weight, color } = req.body;

    // validations

    try {
      await schema.validate(req.body, {
        abortEarly: false
      })
    }
    catch (error) {
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
      return res.status(500).json({ error: err });
    }
  }

  static async remove(req, res) {
    const { id } = req.params

    if (!ObjectId.isValid(id)) {
      return res.status(422).json({ error: 'Id inválido'});
    }

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado' })
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'Pet não permitido' })
    }

    await Pet.findByIdAndRemove(id);

    res.status(200).json({ message: 'Pet excluído com sucesso' });
  }

  static async update(req, res) {
    const { name, age, weight, color, available } = req.body;
    const { id } = req.params;
    const images = req.files;

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado' })
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'Pet não permitido' })
    }

    // validations

    try {
      await schema.validate(req.body, {
        abortEarly: false
      });
    }
    catch (error) {
      return res.status(422).json({ error: error.errors });
    }

    const updatedPet = {
      name,
      age,
      weight,
      color,
    }

    if (images.length > 0) {
      updatedPet.images = []
      images.map((image) => {
        updatedPet.images.push(image.filename);
      })
    }

    await Pet.findByIdAndUpdate(id, updatedPet);

    res.status(200).json({ message: 'Pet atualizado com sucesso' });
  }

  static async schedule(req, res) {
    const { id } = req.params

    console.log('oiiiii')
    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.equals(user._id.toString())) {
      return res.status(403).json({ error: 'Esse Pet já é seu!' });
    }

    // check if user has already scheduled a visit
    if (pet.adopter && pet.adopter._id.equals(user._id)) {
      return res.status(422).json({ error: 'Você já agendou uma visita para este pet!' });
    }

    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image
    }

    await Pet.findByIdAndUpdate(id, pet);

    res.status(200).json({
      message: `Visita agendada com sucesso. Entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}.`
    });
  }

  static async conclude(req, res) {
    const { id } = req.params;

    const pet = await Pet.findOne({ _id: id });

    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }

    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(403).json({ error: 'Pet não permitido' })
    }

    if (!pet.available) {
      return res.status(403).json({ error: 'Pet já foi adotado' })
    }

    // pet foi adotado e não está mais disponível
    pet.available = false;

    await Pet.findByIdAndUpdate(id, pet);

    res.status(200).json({
      message: `Parabéns! ${pet.name} adotado com sucesso`
    })
  }
}
