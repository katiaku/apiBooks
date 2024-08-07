import { pool } from '../db.js';

// @desc   User register
// @route  POST /register
// @access Public
export const userRegister = async (req, res) => {
    try {
        console.log(req.body);

        let params = [req.body.firstName, req.body.lastName, req.body.email, req.body.photo, req.body.password];
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
        let params = [req.body.email, req.body.password];
        let sql = `SELECT * FROM user WHERE email = ? AND password = ?`;

        let [result] = await pool.query(sql, params);
        console.log(result);

        if (result.length > 0) {
            const userData = {
                id_user: result[0].id_user,
                firstName: result[0].firstName,
                lastName: result[0].lastName,
                email: result[0].email,
                photo: result[0].photo
            };
            res.send(userData);
        } else {
            res.send('Input data incorrect');
        }
    } catch (err) {
        console.log(err);
        res.send('Server error');
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
