require('dotenv').config()
const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
// const { register, login, getUsers, getRoles, updateUser, deleteUser } = require('./controllers/user');
// const userMap = require('./helpers/userMap');
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
const routes = require('./routes/index');



const PORT = 3005;
const app = express();

app.use(express.static('../author-blog/dist'));

app.use(cookieParser());
app.use(express.json());

// app.get('/', (req, res) => {
//     res.send({ result: 'OK' })
// })

app.use('/api', routes);


mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
    app.listen(PORT, () => {
        console.log(`Server has been started on port ${PORT}...`);
    }

    );
});