import mysql from 'mysql2/promise'
import dotenv from 'dotenv'


dotenv.config()
const required = ['DB_HOST','DB_USER','DB_PASSWORD','DB_DATABASE']

for (const key of required){
    if(!process.env[key]){
        throw new Error(`Required env var is missing ${key}`)
    }
}

const pool = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    waitForConnections : true,
    connectionLimit : 10,
    queueLimit : 0
})
export default pool;


