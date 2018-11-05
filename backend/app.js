var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
var app = express();

var mongoDB = 'mongodb://localhost/meanProject';
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => {
    console.log("connected to databse!");
});

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use("/posts", postsRoutes);

module.exports = app;