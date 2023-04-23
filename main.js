const express = require('express');
const mysql2 = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const pool = mysql2.createPool({
    host: process.env.MYSQL_HOSTNAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

const getData = async () => {
    const data = await pool.query("SELECT * FROM students;");
    return data[0]
}

app.get("/api", async (req, res) => {
    const results = await getData();
    res.json(results)
})

app.listen(8080, () => {
    console.log("Listening on port 8080")
})

// Javascript ES6