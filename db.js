const mysql = require("mysql2");

const connection = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    ssl: {
        rejectUnauthorized: false
    },
    waitForConnections: true,
    connectionLimit: 10
});

connection.getConnection((err, conn) => {
    if (err) {
        console.log("DB ERROR:", err);
        console.log("Database connection failed");
        return;
    }
    console.log("Connected to MySQL");
    conn.release();
});

module.exports = connection;