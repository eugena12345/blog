const { register, login, getUsers, getRoles, updateUser, deleteUser } = require('../controllers/user');
const userMap = require('../helpers/userMap');
const express = require('express');

// const authenticated = require('./middlewares/authonticated');
// const hasRole = require('./middlewares/hasRole');
// const roles = require('./constants/roles');
// const { addPost,
//     updatePost,
//     deletePost,
//     getPosts,
//     getPost } = require('./controllers/posts');
// const mapPost = require('./helpers/mapPost');
// const { addComment, deleteComment } = require('./controllers/comments');
// const mapComment = require('./helpers/mapComment');


const router = express.Router({ mergeParams: true })



router.post('/register', async (req, res) => {
    try {
        const { user, token } = await register(req.body.login, req.body.password);
        res.cookie('token', token, { httpOnly: true })
            .send({ error: null, user: userMap(user) })
    } catch (error) {
        res.send({ error: error.message || 'Unknown error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { user, token } = await login(req.body.login, req.body.password)
        const mappedUser = userMap(user);

        res.cookie('token', token, { httpOnly: true })
            .send({ error: null, user: mappedUser })
    } catch (error) {
        res.send({ error: error.message || 'Unknown error' });
    }
});

router.post('/logout', async (req, res) => {
    res.cookie('token', '', { httpOnly: true })
        .send({})

});

module.exports = router;
