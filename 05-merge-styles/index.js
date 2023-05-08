const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const stylesPath = path.join(__dirname, 'styles');
const writeStream = fs.createWriteStream(bundlePath);
const options = { withFileTypes: true };

fs.promises.readdir(stylesPath, options).then((data) => {
  data.forEach((el) => {
    if (path.extname(el.name) === '.css') {
      let result = [];
      const readStream = fs.createReadStream(path.join(stylesPath, el.name), 'utf-8');
      readStream.on('data', (data) => result.push(data));
      readStream.on('end', () => writeStream.write(result.join('')));
    }
  });
});