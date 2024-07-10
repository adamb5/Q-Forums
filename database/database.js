// import mysql from 'mysql2'
const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "qforums",
    multipleStatements: true,
  })
  .promise();

module.exports = {
  getEntry: async function () {
    const [result] = await pool.query("SELECT * FROM stack_exchange");
    //console.log(result)
    return result;
  },
  truncateTable: async function () {
    const [sql] = await pool.query(`TRUNCATE TABLE stack_exchange`);
    return sql;
  },
  postEntry: async function (question_id, creation_date, score, reputation, view_count, answer_count, link, title) {
    //pool.query(`TRUNCATE TABLE stack_exchange`)
    const [result] = await pool.query(`INSERT INTO stack_exchange (question_id, creation_date, score, reputation, view_count, answer_count, link, title) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)`, [question_id, creation_date, score, reputation, view_count, answer_count, link, title]
      )
      return result;
  }

};
// export async function getEntry() {
//     const [result] = await pool.query("SELECT * FROM searchData")
//     return result
// }
// const entry = await getEntry()
// console.log(entry)
