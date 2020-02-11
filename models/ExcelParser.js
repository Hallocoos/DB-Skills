const xlsx2json = require('xlsx-json-js');

// takes resolved filepath of excel file, parses object
class ExcelParser {

  // TODO: make correct filePath with given to ExcelParser
  constructor(excelFile) {
    
    var data = xlsx2json.parse(excelFile);
    
    var yourDetails = data[0];
    var backEnd = data[1];
    var frontEnd = data[2];
    var nttSystems = data[3];
    
    // returns array of arrays. each subarray represents a column in table.
    // i.e. 1st column from left == columns[0]
    function getSheetColumns(sheet) {
      if (sheet != undefined) {
        // will hold all columns
        var columns = [];
        var k = 0;
        // for each column, put values of all rows in array
        sheet.data[0].forEach(() => {
          var sheetData = [];
          for (var i = 1; i < sheet.data.length; i++) {
            if (sheet.data[i][k] != undefined)
              sheetData.push(sheet.data[i][k])
          }
          // put array with values of column in array that holds all columns
          columns.push(sheetData);
          k++;
        });
        return columns;
      }
    }
    
    // create object for each table
    var yourDetailsColumns = getSheetColumns(yourDetails);
    var tableYourDetails = {
      name: yourDetailsColumns[0],
      surname: yourDetailsColumns[1],
      jobtitle: yourDetailsColumns[2],
      team: yourDetailsColumns[3],
      linemanager: yourDetailsColumns[4]
    };
    
    
    var backEndColumns = getSheetColumns(backEnd);
    var tableBackEnd = {
      stack: backEndColumns[0],
      skill: backEndColumns[1],
      rating: backEndColumns[2]
    };
    
    var frontEndColumns = getSheetColumns(frontEnd);
    var tableFrontEnd = {
      stack: frontEndColumns[0],
      skill: frontEndColumns[1],
      rating: frontEndColumns[2]
    };
    
    var nttSystemsColumns = getSheetColumns(nttSystems);
    var tableNTTSystems = {
      stack: nttSystemsColumns[0],
      skill: nttSystemsColumns[1],
      rating: nttSystemsColumns[2]
    };
    
    this.excelWorkbook = {
      yourDetails: tableYourDetails,
      backEnd: tableBackEnd,
      frontEnd: tableFrontEnd,
      nttSystems: tableNTTSystems
    }
  }

  get excelObject() {
    return this.excelWorkbook;
  }
  
}

module.exports = ExcelParser;