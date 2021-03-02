const fs = require('fs');
const path = require('path');

const uploadConfig = require('../config/upload');

class DiskStorageProvider {
  async saveFile(file) {
    this.count += 1;

    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  async deleteFile(file) {
    this.count += 1;

    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch (err) {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

module.exports = DiskStorageProvider;
