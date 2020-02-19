const request = require('../models/dbcon');
const dbqry = require('../models/queries');
var ExcelParser = require('../models/ExcelParser');
var path = require('path');

exports.getIndex = (req, res, next) => {
    res.render('../views/guest/upload.ejs', { message: null });
}

exports.getAllEmployees = async (req, res, next) => {
    // console.log('Grabbing your_details table from DB.');
    try {
        await request.query('SELECT * FROM dbo.your_details', function (err, data) {
            if (err)
                console.log(err);
            // else
            // console.log(data.recordset);
            res.render('../views/index.ejs', { data: data.recordset });
        });
    } catch (e) {
        console.log('Error: ' + e);
    }
}

exports.getEmployeeByID = async (req, res, next) => {
    // console.log('Grabbing your_details table from DB.');
    try {
        await request.query('SELECT * FROM dbo.your_details WHERE id =' + req.params.keys + ';', function (err, data) {
            if (err)
                console.log(err);
            // else
            // console.log(data.recordset);
            res.render('../views/index.ejs', { data: data.recordset });
        });
    } catch (e) {
        console.log('Error: ' + e);
    }
}

exports.getEmployeeSkills = async (req, res, next) => {
    // console.log('Grabbing your_details table from DB.');
    try {
        // console.log(req.params.keys);
        query = 'SELECT id, stack, skill, rating' +
            ' FROM dbo.back_end';
        if (req.params.keys !== null)
            query = query + ' WHERE employeeId = ' + req.params.keys;
        query = query + ' UNION' +
            ' SELECT id, stack, skill, rating' +
            ' FROM dbo.front_end';
        if (req.params.keys !== null)
            query = query + ' WHERE employeeId = ' + req.params.keys;
        ' UNION'
        query = query + ' SELECT id, stack, skill, rating' +
            ' FROM dbo.ntt_system';
        if (req.params.keys !== null)
            query = query + ' WHERE employeeId = ' + req.params.keys + ';';

        await request.query(query,
            function (err, data) {
                if (err)
                    console.log(err);
                res.render('../views/index.ejs', { data: data.recordset });
            });
    } catch (e) {
        console.log('Error: ' + e);
    }
}


exports.uploadFile = async (req, res, next) => {
    if (!req.file.filename)
        res.redirect('/');

    var uploadPath = process.env.ROOTPATH + 'uploads\\' + req.file.filename;
    var filePath = path.resolve(uploadPath)


    // instantiate class
    var excelparser = new ExcelParser();
    // parse excel file into object
    excelparser.parseExcel(filePath);

    // get parsed object from class
    var excelObject = excelparser.excelObject;
    // console.log(excelObject);

    employeeDetails = excelObject.yourDetails;

    var id = await dbqry.employeeExists(employeeDetails);
    // console.log(id);

    if (id.recordset == '') {
        await dbqry.insertEmployee(employeeDetails);
        var id = await dbqry.employeeExists(employeeDetails);
        console.log('ID in guest: ');
        console.log(id);
        if (id.recordset) {

            employeeSkills = excelObject;
            // console.log(employeeSkills);

            await dbqry.insertEmployeeSkills(employeeSkills.backEnd, 'back_end', id);
            await dbqry.insertEmployeeSkills(employeeSkills.frontEnd, 'front_end', id);
            await dbqry.insertEmployeeSkills(employeeSkills.nttSystems, 'ntt_system', id);
        }
    } else {
        console.log(id.recordset[0].id);
        console.log("User already in Database.");
    }

    res.send(excelObject);
}
