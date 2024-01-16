const fs = require('fs');
const path = require('path');
const { createDir } = require('../../utils/createDir');

function uploadCertificate(uploadedFile, userId, archName) {
  const user_id = userId.replace(/\D/g, '');
  const userUploadDir = path.join(`${__dirname}/../../../certificates/${user_id}`);
  const { originalname } = uploadedFile;
  const filePath = path.join(userUploadDir, `${archName}${path.extname(originalname)}`);

  createDir(userUploadDir);
  fs.renameSync(uploadedFile.path, filePath);
}

module.exports = {
  uploadCertificate,
};
