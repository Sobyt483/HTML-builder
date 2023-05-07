const path = require('path')
const fs = require('fs')
const dirPath = path.join(__dirname, 'secret-folder')
const options = {withFileTypes: true}
fs.promises.readdir(dirPath, options).then((data) => {
  data.forEach((el) => {
    if(el.isFile()){
      const arr = el.name.split('.')
      const name = arr[0]
      const extn = arr[1]
      fs.stat(path.join(dirPath, el.name), (error, stat) =>  console.log(`${name} - ${extn} - ${stat.size}`))
    }
  })
})