const path = require('path');

const getFilePath = (filename) => path
  .join(__dirname, '..', '..', 'tmp', filename);

module.exports = getFilePath;