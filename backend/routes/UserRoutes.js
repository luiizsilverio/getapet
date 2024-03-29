const router = require('express').Router();

const UserController = require('../controllers/UserController');
const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/upload');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/checkuser', UserController.checkUser);
router.get('/:id', UserController.getUserById);
router.get('/', verifyToken, UserController.getAllUsers);

router.patch('/edit/:id',
  verifyToken,
  imageUpload.single("image"),
  UserController.editUser
);

module.exports = router;