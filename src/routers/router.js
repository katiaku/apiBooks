import { Router } from 'express';
const router = Router();
import { userRegister, userLogin, editUser } from '../controllers/user.controller.js';
import { findBooksByUserId, findBookByBookIdAndByUserId, searchBooksByText, findBooksByRatingAndByUserId, addBook, editBook, deleteBook, editBookRating } from '../controllers/book.controller.js';

router.get('https://api-bookshelve.vercel.app/books', findBooksByUserId);

router.get('https://api-bookshelve.vercel.app/book', findBookByBookIdAndByUserId);

router.get('https://api-bookshelve.vercel.app/search', searchBooksByText);

router.post('https://api-bookshelve.vercel.app/rating', findBooksByRatingAndByUserId);

router.post('https://api-bookshelve.vercel.app/register', userRegister);

router.post('https://api-bookshelve.vercel.app/login', userLogin);

router.post('https://api-bookshelve.vercel.app/books', addBook);

router.put('https://api-bookshelve.vercel.app/books', editBook);

router.put('https://api-bookshelve.vercel.app/users', editUser);

router.patch('https://api-bookshelve.vercel.app/books', editBookRating);

router.delete('https://api-bookshelve.vercel.app/books', deleteBook);

export default router;
