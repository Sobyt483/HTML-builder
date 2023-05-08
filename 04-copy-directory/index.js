const path = require('path')
const fs = require('fs')

const dirPath = path.join(__dirname, 'files')
const newDirPath = path.join(__dirname, 'files-copy')
const options = {withFileTypes: true}

const errorCb = (err) => {
  if (err) throw err
}

fs.mkdir(newDirPath, {recursive:true}, errorCb)

fs.promises.readdir(dirPath, options).then((data) => {
  data.forEach((el) => {
    fs.copyFile(path.join(dirPath, el.name), path.join(newDirPath, el.name), errorCb)
  })
})
