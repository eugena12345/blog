const { mongoose } = require("mongoose")
const mapComment = require("./mapComment")

module.exports = function (post) {
    console.log('post ', post)
    console.log('post.comments ', post.comments)
    return {
        id: post._id,
        title: post.title,
        imageUrl: post.image,
        content: post.content,
        comments: post.comments.map(comment => mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)),
        publishedAt: post.createdAt,
    }
}