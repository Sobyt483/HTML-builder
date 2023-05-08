const { stdout } = process;
const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(filePath, 'utf-8');
let result = '';

stream.on('data', (data) => result += data);
stream.on('end', () => stdout.write(result));
stream.on('error', (error) => console.log('Error', error.message));