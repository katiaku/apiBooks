const { Router } = require('express');
const router = Router();
const { userRegister, userLogin, editUser } = require('../controllers/user.controller');
const { findBooksByUserId, findBookByBookIdAndByUserId, addBook, editBook, deleteBook } = require('../controllers/book.controller');

router.get('/books', findBooksByUserId);

router.get('/book', findBookByBookIdAndByUserId);

router.post('/register', userRegister);

router.post('/login', userLogin);

router.post('/books', addBook);

router.put('/books', editBook);

router.put('/users', editUser);

router.delete('/books', deleteBook);

module.exports = router;
