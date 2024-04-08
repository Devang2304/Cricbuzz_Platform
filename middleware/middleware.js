const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config();
const mysql = require('mysql2/promise.js');
const config = require('../config/config');

const pool = mysql.createPool(config);


const protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);

        const connection=await pool.getConnection();

        const [rows]=await connection.query(`SELECT * FROM users WHERE userId = ?`, [decoded.id]);
       console.log(rows);

        next();
        } catch (error) {
            console.log(error);
            res.status(401).send('Not authorized');
        }
    }
    if(!token){
        res.status(401).send('Not authorized, No token created');
    }
}

module.exports=protect;