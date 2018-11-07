var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    imagePath: {type: String, required: true}
});

module.exports = mongoose.model('Post', postSchema);