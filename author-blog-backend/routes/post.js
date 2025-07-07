//const { register, login, getUsers, getRoles, updateUser, deleteUser } = require('./controllers/user');
//const userMap = require('./helpers/userMap');
const authenticated = require('../middlewares/authonticated');
const hasRole = require('../middlewares/hasRole');
const roles = require('../constants/roles');
const { addPost,
    updatePost,
    deletePost,
    getPosts,
    getPost } = require('../controllers/posts');
const mapPost = require('../helpers/mapPost');
const { addComment, deleteComment } = require('../controllers/comments');
const mapComment = require('../helpers/mapComment');
const express = require('express');


const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
    const { posts, lastPage } = await getPosts(
        req.query.search,
        req.query.limit,
        req.query.page,
    );
    res.send({
        data: {
            posts: posts.map(mapPost), lastPage
        }
    });
});

router.get('/:id', async (req, res) => {
    const post = await getPost(req.params.id,);
    res.send({ data: mapPost(post) });
})


router.post('/:id/comments', authenticated, async (req, res) => {
    const newComment = await addComment(req.params.id, {
        content: req.body.content,
        author: req.user.id
    });
    res.send({ data: mapComment(newComment)})
});

router.delete('/:postId/comments/:commentId', authenticated, hasRole([roles.ADMIN, roles.MODERATOR]), async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);
    res.send({ error: null});
})


router.post('/', authenticated, hasRole([roles.ADMIN]), async (req, res) => {
    const newPost = await addPost({
        title: req.body.title,
        content: req.body.content,
        image: req.body.imageUrl,
    })
    res.send({ data: mapPost(newPost) })
});

router.patch('/:id', authenticated, hasRole([roles.ADMIN]), async (req, res) => {
    const updatedPost = await updatePost(req.params.id, {
        title: req.body.title,
        content: req.body.content,
        image: req.body.imageUrl,
    })
    res.send({ data: mapPost(updatedPost) })
});

router.delete('/:id', authenticated, hasRole([roles.ADMIN]), async (req, res) => {
    await deletePost(req.params.id)
    res.send({ errors: null })
});

module.exports = router;
