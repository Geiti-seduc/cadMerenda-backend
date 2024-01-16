const multer = require('multer');
const path = require('path');
const fs = require('fs');

function createDir(directoryPath, cb) {
  fs.mkdir(directoryPath, { recursive: true }, (err) => {
    if (err) throw err;
    cb();
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { userId } = req.params;
    const user_id = userId.replace(/\D/g, '');
    const userDir = path.join(`${__dirname}/../../../certificates/${user_id}`);

    createDir(userDir, () => cb(null, userDir));
  },
  filename: (req, file, cb) => {
    const { archName } = req.params;

    const extension = path.extname(file.originalname);
    cb(null, `${archName}${extension}`);
  },
});

module.exports = multer({ storage });
