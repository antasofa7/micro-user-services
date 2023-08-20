const express = require('express');

const router = express.Router();

const refreshTokenHandler = require('./handler/resfresh-token');

router.post('/', refreshTokenHandler.create);
router.get('/', refreshTokenHandler.getToken);

module.exports = router;
