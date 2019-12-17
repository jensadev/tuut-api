const {
    createTuut,
    getAllTuuts,
    getTuutById,
    updateTuut,
    deleteTuut
} = require('./tuut.controller');

const router = require('express').Router();
const { checkToken } = require('../auth/tokenValidation');
const cors = require('cors');

router.get('/', cors(), getAllTuuts);
router.get('/:id', getTuutById);
router.post('/', checkToken, createTuut);
router.patch('/', checkToken, updateTuut);
router.delete('/', checkToken, deleteTuut);

module.exports = router;

