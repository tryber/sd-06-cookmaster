const path = require('path');
const fs = require('fs');

const uploadConfig = require('../config/upload');

async function deleteFile(file) {
  this.count += 1;

  const recipeImageFilePath = path.join(uploadConfig.directory, file);
  const recipeImageFileExists = await fs.promises.stat(recipeImageFilePath);

  if (recipeImageFileExists) await fs.promises.unlink(recipeImageFilePath);    
}

module.exports = deleteFile;
