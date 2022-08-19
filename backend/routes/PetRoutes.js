const router = require('express').Router();

const PetController = require('../controllers/PetController');

// middlewares
const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/upload');

router.get('/', PetController.getAll);
router.get('/available', PetController.getAvailable);
router.get('/mypets', verifyToken, PetController.getUserPets);
router.get('/:id', PetController.getPetById);
router.get('/myadoptions', verifyToken, PetController.getUserAdoptions);
router.delete('/:id', verifyToken, PetController.remove);
router.post('/schedule/:id', verifyToken, PetController.schedule);
router.post('/conclude/:id', verifyToken, PetController.conclude);

router.post('/create',
  verifyToken,
  imageUpload.array('images'),
  PetController.create
);

router.patch('/:id',
  verifyToken,
  imageUpload.array('images'),
  PetController.update
);

module.exports = router;
