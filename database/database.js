import mysql from 'mysql2'
//const mysql = require("mysql2")

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Peachs12!',
    database: 'qforums'
}).promise()


/*module.exports = {
    getEntry: async function () {
        const [result] = await pool.query("SELECT * FROM searchData")
        return result
    }
  };*/
export async function getEntry() {
    const [result] = await pool.query("SELECT * FROM searchData")
    return result
}
const entry = await getEntry()
console.log(entry)