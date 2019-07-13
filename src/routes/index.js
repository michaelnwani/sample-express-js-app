const express = require('express');
const router  = express.Router();

// Require controller modules.
const indexController = require('../controllers/indexController');

/*  GET home page */
router.get('/', indexController.index);

module.exports = router;
