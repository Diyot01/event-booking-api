const mysql = require("mysql2");

const connection = mysql.createConnection(process.env.MYSQL_URL);

connection.connect((err) => {
    if (err) {
        console.log("DB ERROR:", err);
        console.log("Database connection failed");
        return;
    }
    console.log("Connected to MySQL");
});

module.exports = connection;