const { pool } = require('../db');

const findBooksByUserId = async (req, res) => {
    try {
        let params = [req.query.id_user];
        console.log(params);
        let sql;
        sql = `SELECT * FROM book WHERE id_user = ?`;
        let [result] = await pool.query(sql, params);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
};

const findBookByBookIdAndByUserId = async (req, res) => {
    try {
        let params = [req.query.id_book, req.query.id_user];
        console.log(params);
        let sql;
        sql = `SELECT * FROM book WHERE id_book = ? AND id_user = ?`;
        let [result] = await pool.query(sql, params);
        res.send(result);
    } catch (err) {
        console.log(err);
    }
};

const addBook = async (req, res) => {
    try {
        console.log(req.body);
        let params = [req.body.id_user, req.body.title, req.body.type, req.body.author, req.body.price, req.body.photo];
        let sql = `INSERT INTO book (id_user, title, type, author, price, photo) 
                    VALUES (?, ?, ?, ?, ?, ?)`;
        console.log(sql);

        let [result] = await pool.query(sql, params);
        console.log(result);

        if (result.insertId)
            res.send(String(result.insertId));
        else
            res.send('Se ha producido un error');
    } catch (err) {
        console.log(err);
    }
};

const editBook = async (req, res) => {
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
    }
};

const deleteBook = async (req, res) => {
    // try {
    //     let params = [req.body.id_book];
    //     let sql = `DELETE FROM book WHERE id_book = ?`;
    //     let [result] = await pool.query(sql, params);
    //     res.send(result);
    //     console.log(result)
    // } catch (err) {
    //     console.log(err);
    // }

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

const editBookRating = async (req, res) => {
    try {
        // let id_book = req.query.id_book;
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

module.exports = { findBooksByUserId, findBookByBookIdAndByUserId, addBook, editBook, deleteBook, editBookRating };
