import { Router } from 'express';
const router = Router();
import { userRegister, userLogin, editUser } from '../controllers/user.controller.js';
import { findBooksByUserId, findBookByBookIdAndByUserId, searchBooksByText, findBooksByRatingAndByUserId, addBook, editBook, deleteBook, editBookRating } from '../controllers/book.controller.js';

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

export default router;
