module.exports = function (user) {
    return {
        id: user._id,
        login: user.login,
        role: user.role,
    }
}