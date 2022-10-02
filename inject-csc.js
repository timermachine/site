var fs = require('fs');

console.log('running inject-csc');

/*
pre: timer dist files to static. 
read timer code file name.
read .out/index.html √
After target div add script to latest timer code. *
write to .out/index.html √
*/
// function readData(err, data) {
//   return data;
// }
const indexPage = './out/index.html';
//const indexPage = 'next-env.d.ts' //testing

var data = fs.readFileSync(indexPage);
data += '<div>Injected+</div>';
fs.writeFileSync(indexPage, data);

// fs.readFile(indexPage, 'utf8', (err, data) => {
//   var writeStream = fs.createWriteStream(indexPage);

//   writeStream.write(data);
//   writeStream.write('<div>Injected</div>');
//   // writeStream.write("Thank You.");
//   writeStream.end();
// });
