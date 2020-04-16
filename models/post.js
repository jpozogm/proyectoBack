const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const PostSchema = Schema({

    postAuthorName: {
        type: String,
        require: true,
    },
        
    postAuthorNickName: {
        type: String,
        require: true,
    },

    postTittle: {
        type: String, 
        default: "Hello World",
        require: true
    },

    postContent: {
        type: String,
        require: true
    },

    postComments: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Post"
    }],
});

module.exports = mongoose.model("Post", PostSchema);


//bad words: {type: String, enum: ["caca", "culo", "pedo", "pis"]},