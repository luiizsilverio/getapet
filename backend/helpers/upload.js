const multer = require("multer");
const path = require("path");

const imageStore = multer.diskStorage({
  destination: function (req, file, callback) {
    let folder = '';
    if (req.baseUrl.includes("users")) {
      folder = 'users';
    }
    else if (req.baseUrl.includes("pets")) {
      folder = 'pets';
    }
    return callback(null, `public/images/${folder}`);
  },
  filename: function (req, file, callback) {
    const fileName = `${Date.now()}-${path.extname(file.originalname)}`;
    return callback(null, fileName)
  }
})

const imageUpload = multer({
  storage: imageStore,
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return callback(new Error("Envie imagens no formato jpg ou png!"));
    }
    callback(null, true);
  }
})

module.exports = { imageUpload }

// o nome original do arquivo do cliente vem no parâmetro file.
// se der erro, callback passa o erro no primeiro parâmetro
