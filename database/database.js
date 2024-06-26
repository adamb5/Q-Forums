<<<<<<< HEAD
//mport mysql from 'mysql2'
=======
// import mysql from 'mysql2'
>>>>>>> 24ca4b94e5427cccb363c54e5b09ab6ad30b9ae1
const mysql = require("mysql2")

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'password',
    database: 'qforums',
}).promise()


module.exports = {
    getEntry: async function () {
        const [result] = await pool.query("SELECT * FROM searchData")
        //console.log(result)
        return result
    }
  };
<<<<<<< HEAD
/*export async function getEntry() {
    const [result] = await pool.query("SELECT * FROM searchData")
    return result
}*/
//const entry = await getEntry()
=======
// export async function getEntry() {
//     const [result] = await pool.query("SELECT * FROM searchData")
//     return result
// }
// const entry = await getEntry()
// console.log(entry)
>>>>>>> 24ca4b94e5427cccb363c54e5b09ab6ad30b9ae1
