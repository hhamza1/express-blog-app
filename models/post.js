var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    create: {type:Date, default:Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username : String
    }
});

module.exports = mongoose.model("Post", postSchema);