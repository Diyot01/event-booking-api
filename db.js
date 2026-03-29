const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "crossover.proxy.rlwy.net",
    user: "root",
    password: "qgNUwjgPjZsyDtqGXfBNHetvxpvtuCTC",
    database: "railway"
});

connection.connect((err) => {
    if (err) {
        console.log("Database connection failed");
        return;
    }
    console.log("Connected to MySQL");
});

module.exports = connection;