const fs = require('fs');
module.exports = function writeOut(outPath, data){
  // @ts-ignore
  fs.writeFile(outPath, data, 'utf8', (error, md) => {
    if (error) {
      throw error;
    }
    process.stderr.write(`wrote to ${outPath}\n`);
  });
}
;