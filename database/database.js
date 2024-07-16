// import mysql from 'mysql2'
const mysql = require("mysql2/promise");

const pool = mysql
  .createConnection({
    host: "q-forums-db.cv884y2g2fxo.us-east-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "qforumspassword",
    database: "q-forums-db",
    multipleStatements: true,
  }).catch((err) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("database connected");
  });

/*pool.getConnection((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("database connected");
});
console.log("works!");*/

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
  postEntry: async function (question_id, creation_date, score, reputation, view_count, answer_count, link, title, body) {
    //pool.query(`TRUNCATE TABLE stack_exchange`)
    const [result] = await pool.query(`INSERT INTO stack_exchange (question_id, creation_date, score, reputation, view_count, answer_count, link, title, body) 
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`, [question_id, creation_date, score, reputation, view_count, answer_count, link, title, body]
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
