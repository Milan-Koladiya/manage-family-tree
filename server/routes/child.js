let express = require('express');
var router = express.Router();

let ChildController = require('../controllers/ChildController');

router.post('/create', ChildController.Create);
router.put('/edit', ChildController.Edit);
router.delete('/delete', ChildController.Delete);

module.exports = router;