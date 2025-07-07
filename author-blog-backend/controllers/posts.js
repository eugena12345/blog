const Post = require('../models/Post');
// create post
async function addPost(post) {
    const newPost = await Post.create(post);
    await newPost.populate({
        path: "comments",
        populate: "author",    
    });
    return newPost
}

//update post
async function updatePost(id, post) {
    const updatedPost = await Post.findByIdAndUpdate(id, post, { returnDocument: 'after' });
    await updatedPost.populate({
        path: "comments",
        populate: "author",    
    });
    return updatedPost;
}

// remove post
async function deletePost(id) {
    return await Post.deleteOne({ _id: id });
}

//get posts с пагинацией и поиском
async function getPosts(search = '', limit = 10, page = 1) {
    const [posts, count] = await Promise.all([
        Post.find({ title: { $regex: search, $options: 'i' } })
            .limit(limit)
            .skip(limit * (page - 1))
            .sort({ createdAt: -1 }),
        Post.countDocuments({ title: { $regex: search, $options: 'i' } }),
    ]);
    return { posts, lastPage: Math.ceil(count / limit) };
}

//get one post
async function getPost(id) {
    return await Post.findById(id).populate({
        path: "comments",
        populate: "author",    
    });
}


module.exports = {
    addPost,
    updatePost,
    deletePost,
    getPosts,
    getPost
}