const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    login
} = require('./user.controller');

const router = require('express').Router();
const { checkToken } = require('../auth/tokenValidation');
// const cors = require('cors');

// var corsOptions = {
//     origin: function (origin, callback) {
//         if (whitelist.indexOf(origin) !== -1 || !origin) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     }
// }

router.post('/', createUser);
router.get('/', checkToken, getUsers);
router.get('/:id', checkToken, getUserById);
router.patch('/', checkToken, updateUser);
router.delete('/', checkToken, deleteUser);
router.post('/login', login);

module.exports = router;

// Grunden baserat på https://www.youtube.com/watch?v=WfCJ3sHnLBM