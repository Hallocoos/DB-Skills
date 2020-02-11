const request = require('../models/dbcon');

exports.getIndex = (req, res, next) => {
    res.render('../views/index.ejs', {});
}

exports.getEmployees = async (req, res, next) => {
    console.log('Grabbing your_details table from DB.');
    try {
        await request.query('SELECT * FROM dbo.your_details', function (err, data) {
            if (err)
                console.log(err);
            else
                console.log(data.recordset);
            res.render('../views/index.ejs', { data: data.recordset });
        });
    } catch (e) {
        console.log('Error: ' + e);
    }
}

// INSERT INTO your_details
// VALUES ('Wouter', 'de Vos', 'Intern', 'Interns', 'Frank Klopper');