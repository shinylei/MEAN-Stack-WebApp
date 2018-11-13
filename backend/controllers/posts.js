const Post = require("../models/post");

exports.createPost = (req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename,
        creator: req.userData.userId
    });
    post.save().then(result => {
        res.status(201).json({
            message: 'Post added successfully!',
            post: {
                _id: result._id,
                ...post
            }
        });
    });    
}

exports.updatePost = (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + '/images/' + req.file.filename;
    }
    const post = new Post({
        _id: req.body._id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath,
        creator: req.userData.userId
    });
    console.log(post);
    Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result => {
        if (result.nModified > 0) {
            res.status(200).json({message: "Post Edited", imagePath: imagePath});
        } else {
            res.status(401).json({message: "Not authorized!"});
        }
    });
}

exports.getPosts = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.page;
    const postQuery = Post.find();
    let fetchedPosts;
    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }
    postQuery
        .then(document=> {
            fetchedPosts = document;
            return Post.countDocuments();
        })
        .then((count) => {
            res.status(200).json({
                message: 'Success',
                posts: fetchedPosts,
                maxPosts: count
            });
         })
    
}

exports.getPost = (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({message: "Post Not Found!"});
        }
    })
}

exports.deletePost = (req, res, next) => {
    // console.log(req.params.id);
    Post.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
        if (result.n > 0) {
            res.status(200).json({message: "Post deleted!"});
        } else {
            res.status(401).json({message: "Not authorized!"});
        }
        
    });
}