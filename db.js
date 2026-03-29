const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    ssl: {
        rejectUnauthorized: false
    }
});

connection.connect((err) => {
    if (err) {
        console.log("DB ERROR:", err);
        console.log("Database connection failed");
        return;
    }
    console.log("Connected to MySQL");
});

module.exports = connection;