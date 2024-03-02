const express = require('express');
const { addMusic, getAllMusics, getMusicDetails } = require('../controllers/music.controller');
const router = express.Router();

router.post('/add-music', addMusic);

router.get('/get-all-music', getAllMusics);

router.get('/music-detail/:id', getMusicDetails);

module.exports = router;