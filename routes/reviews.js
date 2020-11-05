const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { Review } = require('../db/models');

router.get('/users/:id(\\d+)/reviews', asyncHandler(async (req, res) => {
    const reviews = await Review.findAll();
    res.render('reviews', { title: 'Reviews', reviews });
}));




module.exports = router;