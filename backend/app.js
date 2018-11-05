var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Post = require('./models/post');

var app = express();

var mongoDB = 'mongodb://localhost/meanProject';
mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => {
    console.log("connected to databse!");
});

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content : req.body.content
    });
    post.save().then(result => {
        res.status(201).json({
            message: 'Post added successfully!',
            postId: result._id,
        });
    });
    
});

app.get('/posts', (req, res, next) => {
    Post.find().then((data) => {
        res.status(200).json({
            message: 'Success',
            posts: data
        });
    })
    
});

app.delete('/posts/:id', (req, res, next) => {
    console.log(req.params.id);
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: "Post deleted!"});
    });
});

module.exports = app;