// import mysql from 'mysql2'
require("dotenv").config();
const mysql = require("mysql2");
let pool = null;
try {
  pool = mysql
    .createPool({
      host: "q-forums-db.cv884y2g2fxo.us-east-1.rds.amazonaws.com",
      port: "3306",
      user: "admin",
      password: "qforumspassword",
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
    tag
  ) {
    //pool.query(`TRUNCATE TABLE stack_exchange`)
    const [result] = await pool.query(
      `INSERT IGNORE INTO stack_exchange (question_id, creation_date, score, reputation, view_count, answer_count, link, title, body, tag) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        tag
      ]
    );
    return result;
  },
};
// export async function getEntry() {
//     const [result] = await pool.query("SELECT * FROM searchData")
//     return result
// }
// const entry = await getEntry()
// console.log(entry)
