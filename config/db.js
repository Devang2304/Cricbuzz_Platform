const mysql=require('mysql2');
const config=require('./config');


const connectToDB=async () => {
    const pool = mysql.createPool(config);

    try {
        pool.getConnection((connect)=>{
            console.log('connected to MYSQL database');
        });
    } catch (error) {
        console.log("error connecting to MYSQL database", error);
    };
};

module.exports=connectToDB