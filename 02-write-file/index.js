const { stdin, stdout } = process;
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(filePath);

stdout.write('Введите сообщение:\n');

stdin.on('data', (data) => {
  const str = data.toString();
  if (str.trim() === 'exit'){
    process.exit();
  }
  output.write(str);
});

process.on('SIGINT', () => {
  process.exit();
});
process.on('exit', () => console.log('До встречи!'));