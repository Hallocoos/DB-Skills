if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

var sql = require("mssql");

// config for your database
var config = {
    user: process.env.USER,
    password: process.env.PASS,
    server: process.env.SERVER,
    database: process.env.DATABASE
};

console.log(config);

// connect to your database
sql.connect(config, function (err) {
    if (err)
        console.log(err);
    else {
        var request = new sql.Request();

        request.query("IF DB_ID('" + config.database + "') IS NOT NULL" +
            " SELECT DB_ID();" +
            " ELSE" +
            " CREATE DATABASE " + config.database, (err) => {
                if (err)
                    console.log(err);
            });

        request.query("IF OBJECT_ID(N'dbo.your_details', N'U') IS NOT NULL" +
            " SELECT * FROM your_details;" +
            " ELSE" +
            " CREATE TABLE your_details(" +
            " id int NOT NULL IDENTITY," +
            " name varchar(30) NOT NULL," +
            " surname varchar(30) NOT NULL," +
            " job_title varchar(30) NOT NULL," +
            " team varchar(30) NOT NULL," +
            " line_manager varchar(30) NOT NULL," +
            " PRIMARY KEY(id)" +
            " );", (err) => {
                if (err)
                    console.log(err);
            });
        request.query("IF OBJECT_ID(N'dbo.back_end', N'U') IS NOT NULL" +
            " SELECT * FROM back_end;" +
            " ELSE" +
            " CREATE TABLE back_end(" +
            " id int NOT NULL IDENTITY);", (err) => {
                if (err)
                    console.log(err);
            });
        request.query("IF OBJECT_ID(N'dbo.front_end', N'U') IS NOT NULL" +
            " SELECT * FROM front_end;" +
            " ELSE" +
            " CREATE TABLE front_end(" +
            " id int NOT NULL IDENTITY);", (err) => {
                if (err)
                    console.log(err);
            });
        request.query("IF OBJECT_ID(N'dbo.ntt_system', N'U') IS NOT NULL" +
            " SELECT * FROM ntt_system;" +
            " ELSE" +
            " CREATE TABLE ntt_system(" +
            " id int NOT NULL IDENTITY);", (err) => {
                if (err)
                    console.log(err);
            });
        console.log("Connection successful!");
    }
});

var request = new sql.Request();

module.exports = request;