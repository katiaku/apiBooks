import { pool } from '../db.js';

// @desc   Find book by user id
// @route  GET /books
// @access Public
export const findBooksByUserId = async (req, res) => {
    try {
        let params = [req.query.id_user];
        console.log(params);
        let sql;
        sql = `SELECT * FROM book WHERE id_user = ?`;
        let [result] = await pool.query(sql, params);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

// @desc   Find book by book id and by user id
// @route  GET /book
// @access Public
export const findBookByBookIdAndByUserId = async (req, res) => {
    try {
        let params = [req.query.id_book, req.query.id_user];
        console.log(params);
        let sql;
        sql = `SELECT * FROM book WHERE id_book = ? AND id_user = ?`;
        let [result] = await pool.query(sql, params);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

// @desc   Find books by rating and by user id
// @route  POST /rating
// @access Public
export const findBooksByRatingAndByUserId = async (req, res) => {
    try {
        let params = [req.body.id_user, req.body.rating];
        console.log(params);
        let sql;
        sql = `SELECT * FROM book WHERE id_user = ? AND rating = ?`;
        let [result] = await pool.query(sql, params);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

// @desc   Search books by text
// @route  GET /search
// @access Public
export const searchBooksByText = async (req, res) => {
    try {
        const { id_user, query } = req.query;
        const sql = `SELECT * FROM book WHERE id_user = ? AND (title LIKE ? OR author LIKE ?)`;
        const params = [id_user, `%${query}%`, `%${query}%`];
        const [result] = await pool.query(sql, params);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

// @desc   Add book
// @route  POST /books
// @access Public
export const addBook = async (req, res) => {
    try {
        console.log(req.body);
        let params = [req.body.id_user, req.body.title, req.body.type, 
            req.body.author, req.body.price, req.body.photo];
        let sql = `INSERT INTO book (id_user, title, type, author, price, photo) 
                    VALUES (?, ?, ?, ?, ?, ?)`;
        console.log(sql);

        let [result] = await pool.query(sql, params);
        console.log(result);

        if (result.insertId)
            res.send(String(result.insertId));
        else
            res.send('There was an error');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

// @desc   Edit book
// @route  PUT /books
// @access Public
export const editBook = async (req, res) => {
    try {
        let params = [req.body.id_user, req.body.title, req.body.type, req.body.author, 
            req.body.price, req.body.photo, req.body.id_book];
        let sql = `UPDATE book 
                    SET id_user = COALESCE(?, id_user), title = COALESCE(?, title), 
                    type = COALESCE(?, type), author = COALESCE(?, author), 
                    price = COALESCE(?, price), photo = COALESCE(?, photo)   
                    WHERE id_book = ?`;
        let [result] = await pool.query(sql, params);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

// @desc   Delete book
// @route  DELETE /books
// @access Public
export const deleteBook = async (req, res) => {
    try {
        let id_book = req.query.id_book;
        let sql = `DELETE FROM book WHERE id_book = ?`;
        let [result] = await pool.query(sql, [id_book]);
        res.send(result);
        console.log(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

// @desc   Edit book rating
// @route  PATCH /books
// @access Public
export const editBookRating = async (req, res) => {
    try {
        let params = [req.body.rating, req.body.id_book];
        let sql = `UPDATE book 
                    SET rating = COALESCE(?, rating)   
                    WHERE id_book = ?`;
        let [result] = await pool.query(sql, params);
        res.send(result);
        console.log("edit book", result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};
