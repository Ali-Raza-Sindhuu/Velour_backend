import pool from "../config/db.js";

export const findUserByEmail = async(email) => {
    const query = `
    SELECT id, first_name, last_name,email, password 
    from users
    WHERE email = ? 
    limit 1`;

    const [rows] = await pool.execute(query, [email])

    return rows[0] || null;
}

export const createUser = async({
    firstname,
    lastname,
    email,
    password,
    role = 'USER'
}) => {
    const query = `
    INSERT INTO users 
    (first_name, last_name, email, password, role)
    VALUES 
    (?,?,?,?,?) 
    `;

    const [result] = await pool.execute(query, [firstname, lastname, email, password, role])

    return result.insertId;
}