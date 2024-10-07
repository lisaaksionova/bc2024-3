const { program } = require('commander');
const  fs  = require('fs');

let readFromFile = function(path) {
    let jsonData = fs.readFileSync(path, { encoding: 'utf-8', flag: 'r' });
    
    
    let data = JSON.parse(jsonData);
    
    let str = '';
    
    
    data.forEach(obj => {
      if (obj.txt === "Доходи, усього" || obj.txt === "Витрати, усього") {
        str += obj.txt + ' : ' + obj.value + '\n';
      }
    });
    
    return str;
}


program
  .option('-i, --input <path> ')
  .option('-o, --output <path>')
  .option('-d, --display');

program.parse(process.argv);

const options = program.opts();
  
if (!options.input) {
    console.error('Please, specify input file');
  }
if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1); 
}

if (options.output) {
  const data = readFromFile(options.input); 
  fs.writeFileSync(options.output, data, { encoding: 'utf-8' });
}
  

if(options.display){
  console.log(readFromFile(options.input));
}

