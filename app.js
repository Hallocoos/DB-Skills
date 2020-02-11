var express = require("express");
var app = express();
var ExcelParser = require('./models/ExcelParser');
var path = require("path");
var request = require("./models/dbcon");

var server = app.listen(8080, function () {
    console.log("Server started on PORT 5000");
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// assuming you put views folder in the same directory as app.js
app.set('view engine', 'ejs');
app.set('views', 'views')
// router - wherever you put it, could be in app.js
var router = express.Router();
router.get('/', function (req, res) {
    res.render('/index.ejs');
})

// const adminRoutes = require("./routes/admin");
// const authRoutes = require("./routes/auth");
const guestRoutes = require("./routes/guest");

// app.use('/admin', adminRoutes);
// app.use(authRoutes);
app.use(guestRoutes);
