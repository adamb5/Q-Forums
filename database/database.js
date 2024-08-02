// import mysql from 'mysql2'
require("dotenv").config({path: '../.env'});
const mysql = require("mysql2");
// console.log(process.env);
let pool = null;
try {
  pool = mysql
    .createPool({
      host: process.env.DATABASE_HOST, 
      port: "3306",
      user: process.env.DATABASE_USER, 
      password: process.env.DATABASE_PASSWORD, 
      database: "q-forums-db",
      multipleStatements: true,
    })
    .promise();
  console.log("database connected");
} catch (err) {
  if (err) {
    console.log(err.message);
    return;
  }
}

/*.catch((err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("database connected");
  });*/

/*pool.connect((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("database connected");
});*/
//console.log("works!");

module.exports = {
  getEntry: async function () {
    const [result] = await pool.query("SELECT * FROM stack_exchange");
    //console.log(result)
    return result;
  },
  postEntry: async function (
    question_id,
    creation_date,
    score,
    reputation,
    view_count,
    answer_count,
    link,
    title,
    body,
    tagged,
    suspicious,
    label
  ) {

    //pool.query(`TRUNCATE TABLE stack_exchange`)
    const [result] = await pool.query(
      `INSERT IGNORE INTO stack_exchange (question_id, creation_date, score, reputation, view_count, answer_count, link, title, body, tagged, suspicious, label) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        question_id,
        creation_date,
        score,
        reputation,
        view_count,
        answer_count,
        link,
        title,
        body,
        tagged,
        suspicious,
        label
      ]
    );
    return result;
  },

  checkAndTruncateTable: async function () {
    try {
      const [rows] = await pool.query("SELECT COUNT(*) AS count FROM stack_exchange");
      const rowCount = rows[0].count;
  
      if (rowCount >= 5000) {
        await pool.query("TRUNCATE TABLE stack_exchange");
        console.log("Table truncated as it had 5000 or more rows.");
      }
    } catch (error) {
      console.error("Error checking or truncating table:", error);
    }
  },
};
// export async function getEntry() {
//     const [result] = await pool.query("SELECT * FROM searchData")
//     return result
// }
// const entry = await getEntry()
// console.log(entry)
