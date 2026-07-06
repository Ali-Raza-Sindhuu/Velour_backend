import pool from "./db.js";

console.log("Test file");

(async () =>{
    try {
        const [rows] = await pool.query(`SELECT 1 + 1 AS result`);
        console.log("Database connected Successfully", rows);
        process.exit(0);
    } catch (error) {
        console.log("Database connection failed", error.message);
        process.exit(1);
    }
})()