const express = require('express');

const controller = require('../controllers/controller');

const router = express.Router();

router.get('/notes/:noteId', controller.getNote);
router.get('/notes/', controller.getNotes);
router.post('/notes/', controller.postNote);
router.put('/notes/', controller.putNote);
router.delete('/notes/:noteId', controller.deleteNote);

module.exports = router;