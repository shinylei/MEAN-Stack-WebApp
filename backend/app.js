var express = require('express');
var app = express();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.use('/posts', (req, res, next) => {
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