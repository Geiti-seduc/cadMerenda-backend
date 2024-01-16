const express = require('express');
const exempleController = require('../controllers/exempleController');

const router = express.Router();

router.get('/', exempleController.getExemple);
router.get('/:id', exempleController.getExempleById);
router.post('/', exempleController.createExemple);
router.put('/:id', exempleController.updateExemple);
router.delete('/:id', exempleController.deleteExemple);

module.exports = router;
