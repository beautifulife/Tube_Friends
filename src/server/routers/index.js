const express = require('express');

const router = express.Router();

router.get('/:sort', (req, res) => {
  res.sendFile('index.html', { root: './dist/' });
});

router.get('/:sort/:category', (req, res) => {
  res.sendFile('index.html', { root: './dist/' });
});

router.get('/:category/:username/:story_id', (req, res) => {
  res.sendFile('index.html', { root: './dist/' });
});

router.get('/:username/feed', (req, res) => {
  res.sendFile('index.html', { root: './dist/' });
});

router.get('/create', (req, res) => {
  res.sendFile('index.html', { root: './dist/' });
});

module.exports = router;
