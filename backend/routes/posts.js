const express = require('express');

const PostController = require('../controllers/posts');
const checkAuth = require("../middleware/check-auth");
const extractfile = require("../middleware/file");

const router = express.Router();

router.get('', PostController.getPosts);

router.get('/:id', PostController.getPost);

router.post("",checkAuth, extractfile, PostController.createPost);

router.delete('/:id', checkAuth, PostController.deletePost);

router.put('/:id', checkAuth, extractfile, PostController.updatePost);

module.exports = router;