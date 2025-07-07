require('dotenv').config()
const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');

const PORT = 3005;
const app = express();

app.use(express.static('../author-blog/dist'));

app.use(cookieParser());
app.use(express.json());

app.use('/api', routes);

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
    app.listen(PORT, () => {
        console.log(`Server has been started on port ${PORT}...`);
    }

    );
});