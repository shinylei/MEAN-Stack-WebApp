var express = require('express');
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/posts", (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully!'
    });
});

app.get('/posts', (req, res, next) => {
    const posts = [
        {
            id: 'easdfds',
            title: 'First',
            content: 'First Content',
        },
        {
            id: 'easdfds',
            title: 'Sirst',
            content: 'Sirst Content',
        },
    ]
    res.status(200).json({
        message: 'Success',
        posts: posts
    });
});

module.exports = app;