const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, 'secret-folder');
const options = {withFileTypes: true};

fs.promises.readdir(dirPath, options).then((data) => {
  data.forEach((el) => {
    if(el.isFile()){
      const name = el.name.replace(path.extname(el.name), '');
      const extn = path.extname(el.name).slice(1);
      fs.stat(path.join(dirPath, el.name), (error, stat) =>  console.log(`${name} - ${extn} - ${stat.size}`));
    }
  });
});