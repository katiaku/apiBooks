import { pool } from '../db.js';
import bcrypt from 'bcrypt';

// @desc   User register
// @route  POST /register
// @access Public
export const userRegister = async (req, res) => {
    try {
        console.log(req.body);

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        let params = [req.body.firstName, req.body.lastName, req.body.email, req.body.photo, hashedPassword];
        let sql = `INSERT INTO user (firstName, lastName, email, photo, password) 
                    VALUES (?, ?, ?, ?, ?)`;
        console.log(sql);

        let [result] = await pool.query(sql, params);
        console.log(result);

        if (result.insertId)
            res.send(String(result.insertId));
        else
            res.send('Error registering a user');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

// @desc   User login
// @route  POST /login
// @access Public
export const userLogin = async (req, res) => {
    try {
        console.log(req.body);
        let params = [req.body.email];
        let sql = `SELECT * FROM user WHERE email = ?`;

        let [result] = await pool.query(sql, params);
        console.log(result);

        if (result.length > 0) {
            const user = result[0];
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);

            if (passwordMatch) {
                const userData = {
                    id_user: user.id_user,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    photo: user.photo
                };
                res.send(userData);
            } else {
                res.send('Input data incorrect');
            }
        } else {
            res.send('Input data incorrect');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};

// @desc   Edit user
// @route  PUT /users
// @access Public
export const editUser = async (req, res) => {
    try {
        let params = [req.body.firstName, req.body.lastName, req.body.photo, req.body.email];
        let sql = `UPDATE user 
                    SET firstName = COALESCE(?, firstName), lastName = COALESCE(?, lastName), 
                    photo = COALESCE(?, photo)   
                    WHERE email = ?`;
        let [result] = await pool.query(sql, params);
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};
