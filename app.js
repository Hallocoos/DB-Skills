var express = require("express");
var app = express(); W
var request = require("./models/dbcon");

var server = app.listen(5000, function () {
    console.log("Server started on PORT 5000");
});

app.get("/");

// const adminRoutes = require("./routes/admin");
// const authRoutes = require("./routes/auth");
const guestRoutes = require("./routes/guest");

// app.use('/admin', adminRoutes);
// app.use(authRoutes);
app.use(guestRoutes);
