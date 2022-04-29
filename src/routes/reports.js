const express = require('express');
const reportsController = require('../controllers/reports');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, reportsController.createReport);
router.get('/', auth, reportsController.getAllReports);
router.get('/:id', auth, reportsController.getOneReport);
// router.put('/:id', auth, reportsController.modifyReport);
router.delete('/:id', auth, reportsController.deleteReport);

module.exports = router;
