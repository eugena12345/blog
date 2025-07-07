const Comment = require('../models/Comment');
const Post = require('../models/Post');

//add comment
async function addComment(postId, comment) {
    const newComment = await Comment.create(comment);
    await Post.findByIdAndUpdate(postId, { $push: { comments: newComment.id } });
    await newComment.populate('author');
    return newComment;
}

//detete commment
async function deleteComment(postId, commentId) {

     await Comment.deleteOne({ _id: commentId });
         await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });

}


//get comments

module.exports = {
    addComment,
    deleteComment
}