let express = require('express');
var router = express.Router();

let parentController = require('../controllers/ParentController');

router.post('/', parentController.Create);
router.get('/', parentController.get);

module.exports = router;