const { program } = require('commander');
const  fs  = require('fs');
program
  .option('-i, --input <path> ')
  .option('-o, --output <path>')
  .option('-d, --display');

  program.parse(process.argv);

  const options = program.opts();
  
  if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1); // Вихід з кодом помилки
  }
 // Перевірка наявності файлу
if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1); // Вихід з кодом помилки
}
if(options.output){
  const jsonData = fs.readFileSync(options.input, {
    'encoding':'utf-8',
    'flag':'r'
  });
  let obj;
  jsonData.forEach(e=>{
    if(e.txt == "Доходи, усього" 
      || e.txt == "Витрати, усього"
    )
    obj += e.txt + ' : ' + e.value + '\n';
  })
  

   fs.writeFileSync(options.output, 
    JSON.stringify(obj, null, 4),
    {
      'encoding' : 'utf-8',
      'flag':'w',
      'flush':true
    }
  );
}

if(options.display){
  let jsonData = fs.readFileSync(options.input, {
    'encoding':'utf-8',
    'flag':'r'
  });
  let obj;
  jsonData = JSON.parse(jsonData);
  jsonData.forEach(e=>{
    if(e.txt == "Доходи, усього" 
      || e.txt == "Витрати, усього"
    )
    obj += e.txt + ' : ' + e.value + '\n';
  })
  console.log(obj);
}
  console.log(`Input path is: ${options.input}`);

