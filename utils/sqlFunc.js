const mysql = require("mysql2");
const config = require("../config/config");
const pool = mysql.createPool(config);

const createTable = (schema) => {
  return new Promise((resolve, reject) => {
    pool.query(schema, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const checkRecordsExist = (table, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${table} WHERE ${column}=?`;

    pool.query(query, [value], (err, result) => {
      if (err) reject(err);
      resolve(result.length ? result[0] : null);
    });
  });
};

const insertData = (table, data) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${table} SET ?`;

    pool.query(query, [data], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = { createTable, checkRecordsExist, insertData };
