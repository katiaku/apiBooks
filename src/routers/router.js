const { Router } = require('express');
const router = Router();
const { userRegister, userLogin, editUser } = require('../controllers/user.controller');
const {
    findBooksByUserId,
    findBookByBookIdAndByUserId,
    searchBooksByText,
    findBooksByRatingAndByUserId,
    addBook,
    editBook,
    deleteBook,
    editBookRating
} = require('../controllers/book.controller');

router.get('/books', findBooksByUserId);

router.get('/book', findBookByBookIdAndByUserId);

router.get('/search', searchBooksByText);

router.post('/rating', findBooksByRatingAndByUserId);

router.post('/register', userRegister);

router.post('/login', userLogin);

router.post('/books', addBook);

router.put('/books', editBook);

router.put('/users', editUser);

router.patch('/books', editBookRating);

router.delete('/books', deleteBook);

module.exports = router;
