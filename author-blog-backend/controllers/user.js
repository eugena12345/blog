const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate, verify } = require('../helpers/token');
const { ADMIN, MODERATOR, USER } = require('../constants/roles');
//регистрация
async function register(login, password) {
    if (!password) {
        throw new Error("Password is empty")
    }
    const passwodrdHash = await bcrypt.hash(password, 10);
    const user = await User.create({ login, password: passwodrdHash })
    const token = generate({ id: user.id });

    return { user, token };
};

//логин
async function login(login, password) {
    const user = await User.findOne({ login });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Password is wrong');
    }
    const token = generate({ id: user.id });
    return { user, token };
};

async function getUsers() {
    return await User.find();
};

function getRoles() {
    return [
        { id: ADMIN, name: 'Admin' },
        { id: MODERATOR, name: 'Moderator' },
        { id: USER, name: 'User' }
    ]
}

// delete user
async function deleteUser(id) {
    return await User.deleteOne({ _id: id });
}

// edite user role
async function updateUser(id, userData) {
    return await User.findByIdAndUpdate(id, userData, { returnDocument: 'after' });
}


module.exports = {
    register,
    login,
    getUsers,
    getRoles,
    deleteUser,
    updateUser
}