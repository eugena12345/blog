const userMap = require('../helpers/userMap');
const authenticated = require('../middlewares/authonticated');
const hasRole = require('../middlewares/hasRole');
const roles = require('../constants/roles');
const express = require('express');
const { getUsers, getRoles, updateUser, deleteUser } = require('./../controllers/user');

const router = express.Router({ mergeParams: true })

router.get('/', authenticated, hasRole([roles.ADMIN]), async (req, res) => {
    const users = await getUsers();
    res.send({ data: users.map(userMap) });
});

router.get('/roles', authenticated, hasRole([roles.ADMIN]), async (req, res) => {
    const roles = await getRoles();
    res.send({ data: roles });
});

router.patch('/:id', authenticated, hasRole([roles.ADMIN]), async (req, res) => {
    const newUser = await updateUser(req.params.id, {
        role: req.body.roleId
    })
    res.send({ data: userMap(newUser) });
});

router.delete('/:id', authenticated, hasRole([roles.ADMIN]), async (req, res) => {
    await deleteUser(req.params.id);

    res.send({ errors: null })
})

module.exports = router;
