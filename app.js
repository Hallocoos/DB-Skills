const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
// const ExcelParser = require('./models/ExcelParser');
// const path = require("path");
// const request = require("./models/dbcon");
const guestRoutes = require("./routes/guest");

var server = app.listen(8080, function () {
    console.log("1/2: Server started on PORT 8080");
});

app.use(bodyParser.urlencoded({ extended: false }));
// assuming you put views folder in the same directory as app.js
app.set('view engine', 'ejs');
app.set('views', 'views')
// router - wherever you put it, could be in app.js
router.get('/', function (req, res) {
    res.render('/index.ejs');
})

// const adminRoutes = require("./routes/admin");
// const authRoutes = require("./routes/auth");

// app.use('/admin', adminRoutes);
// app.use(authRoutes);
app.use(guestRoutes);
