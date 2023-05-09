const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, 'files');
const newDirPath = path.join(__dirname, 'files-copy');
const options = {withFileTypes: true};


const errorCb = (err) => {
  if (err) throw err;
};

const copyFiles = (dir, newDir) =>{
  fs.mkdir(newDir, { recursive: true }, errorCb);
  fs.promises.readdir(dir, options).then((data) => {
    data.forEach((el) => {
      if (!el.isFile()){
        fs.mkdir(path.join(newDir, el.name), {recursive:true}, errorCb);
        copyFiles(path.join(dir, el.name), path.join(newDir, el.name));
      } else{
        fs.copyFile(path.join(dir, el.name), path.join(newDir, el.name), errorCb);
      }
    });
  });
};

const copyFolder = (dir, newDir) => {
  fs.rm(newDir , {recursive: true}, err => {
    if(err){
      copyFiles(dir, newDir);
    }else{
      copyFiles(dir, newDir);
    }
  });
};
copyFolder(dirPath, newDirPath);

