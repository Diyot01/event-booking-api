const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "event_booking"
});

connection.connect((err) => {
    if (err) {
        console.log("Database connection failed");
        return;
    }
    console.log("Connected to MySQL");
});

module.exports = connection;