const express = require('express');
const router = express.Router();

//select the router file
var childRouter = require('./child');
var parenteRouter = require('./parent');

router.use('/child', childRouter);
router.use('/parent', parenteRouter);

module.exports = router;