const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./utils');
const { Book } = require('../db/models');

router.get('/', asyncHandler(async (req, res) => {
    const books = await Book.findAll();
    res.render('books', { title: 'Books', books });
}));




module.exports = router;
