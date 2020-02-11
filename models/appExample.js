// require class
var ExcelParser = require('./ExcelParser');
var path = require("path");

// resolve with uploaded file into filePath
var filePath = path.resolve("/mnt/c/Users/Ricgardt.Engelbrecht/Downloads/DBSauce", process.argv[2])

// instantiate class with path to excel file
var excelparser = new ExcelParser(filePath);

// get parsed object from class
var excelObject = excelparser.excelObject;

//console.log(excelObject);