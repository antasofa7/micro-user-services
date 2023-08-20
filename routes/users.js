const express = require('express');

const router = express.Router();

const userHandler = require('./handler/users');

router.post('/register', userHandler.register);
router.post('/login', userHandler.login);
router.patch('/:id', userHandler.update);
router.post('/logout', userHandler.logout);

router.get('/:id', userHandler.get);
router.get('/', userHandler.getAll);

module.exports = router;
