const express = require('express');
const helper = require('../util/helper');

const router = express.Router();

router.get('/', (req, res) => res.sendFile(helper.getPath('views', 'shop.html')));

module.exports = router;