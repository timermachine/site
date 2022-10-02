var fs = require('fs');

console.log('running inject-csc');

var writeStream = fs.createWriteStream('./out/injection.html');
writeStream.write('<div>Injected</div>');
// writeStream.write("Thank You.");
writeStream.end();
