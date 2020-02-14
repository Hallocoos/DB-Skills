// require class
var ExcelParser = require('./ExcelParser.js');
var path = require("path");

// resolve with uploaded file into filePath
var filePath = path.resolve('CDiogo Skills DB.xlsx');

// instantiate class
var excelparser = new ExcelParser();

// use method to parse excel spreadsheet
excelparser.parseExcel(filePath)

// get parsed object from class
let excelObject = excelparser.excelObject;

console.log(excelObject);