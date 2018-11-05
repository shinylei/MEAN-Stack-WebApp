const express = require('express');

const Post = require("../models/post");

const router = express.Router();

router.get('', (req, res, next) => {
    Post.find().then((data) => {
        res.status(200).json({
            message: 'Success',
            posts: data
        });
    })
    
});

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "Post Not Found!"});
        }
    })
});

router.post("", (req, res, next) => {
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

router.delete('/:id', (req, res, next) => {
    // console.log(req.params.id);
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: "Post deleted!"});
    });
});

router.put('/:id', (req, res, next) => {
    const post = new Post({
        _id: req.body._id,
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    Post.updateOne({_id: req.params.id}, post).then(result => {
        console.log(result);
        res.status(200).json({message: "Post Edited"});
    });
});

module.exports = router;