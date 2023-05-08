const path = require('path');
const fs = require('fs');

const assetsPath = path.join(__dirname, 'assets');
const projectPath = path.join(__dirname, 'project-dist');
const newAssetsPath = path.join(projectPath, 'assets');
const options = {withFileTypes: true};

const errorCb = (err) => {
  if (err) throw err;
};

fs.mkdir(projectPath, {recursive:true}, errorCb);

const copyFiles = (dirpath, newPath) => {
  fs.mkdir(newAssetsPath, {recursive:true}, (error) => {
    errorCb(error);
    fs.promises.readdir(dirpath, options).then((data) => {
      data.forEach((el) => {
        if (!el.isFile()){
          fs.mkdir(path.join(newPath, el.name), {recursive:true}, errorCb);
          copyFiles(path.join(dirpath, el.name), path.join(newPath, el.name));
        } else{
          fs.copyFile(path.join(dirpath, el.name), path.join(newPath, el.name), errorCb);
        }
      });
    });
  });
};
copyFiles(assetsPath, newAssetsPath);

const bundlePath = path.join(__dirname, 'project-dist', 'style.css');
const stylesPath = path.join(__dirname, 'styles');
const writeCssStream = fs.createWriteStream(bundlePath);

fs.promises.readdir(stylesPath, options).then((data) => {
  data.forEach((el) => {
    if (path.extname(el.name) === '.css') {
      let result = [];
      const readStream = fs.createReadStream(path.join(stylesPath, el.name), 'utf-8');
      readStream.on('data', (data) => result.push(data));
      readStream.on('end', () => writeCssStream.write(result.join('')));
    }
  });
});

const htmlPath = path.join(__dirname, 'project-dist', 'index.html');
const componentsPath = path.join(__dirname, 'components');

const templateRead = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
const template = [];
templateRead.on('data', (data) => template.push(data));

fs.promises.readdir(componentsPath, options).then((data) => {
  data.forEach((el) => {
    if (path.extname(el.name) === '.html') {
      const readStream = fs.createReadStream(path.join(componentsPath, el.name), 'utf-8');
      readStream.on('data', (data) => {
        const writeHtmlStream = fs.createWriteStream(htmlPath);
        const res = data.toString();
        const name = el.name.replace(path.extname(el.name), '');
        console.log(name);
        template[0] = template[0].replace(`{{${name}}}`, res);
        writeHtmlStream.write(template.join(''));
      });
    }
  });
});