const express = require("express");
const app = express();
const db = require("./db");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.get("/events", (req, res) => {
    const query = "SELECT * FROM events WHERE date >= NOW()";

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Something went wrong" });
        }

        res.json(result);
    });
});

app.post("/events", (req, res) => {
    const { title, description, date, total_capacity } = req.body;

    const query = `
        INSERT INTO events (title, description, date, total_capacity, remaining_tickets)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [title, description, date, total_capacity, total_capacity],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Failed to create event" });
            }

            res.json({ message: "Event created successfully" });
        }
    );
});

app.post("/bookings", (req, res) => {
    const { user_id, event_id, tickets } = req.body;

    const checkQuery = "SELECT remaining_tickets FROM events WHERE id = ?";

    db.query(checkQuery, [event_id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error checking tickets" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Event not found" });
        }

        const remaining = result[0].remaining_tickets;

        if (remaining < tickets) {
            return res.status(400).json({ error: "Not enough tickets available" });
        }

        const bookingCode = "BOOK" + Date.now();

        const updateQuery = "UPDATE events SET remaining_tickets = remaining_tickets - ? WHERE id = ?";
        const insertQuery = `
            INSERT INTO bookings (user_id, event_id, tickets, booking_code)
            VALUES (?, ?, ?, ?)
        `;

        db.query(updateQuery, [tickets, event_id], (err) => {
            if (err) {
                return res.status(500).json({ error: "Error updating tickets" });
            }

            db.query(insertQuery, [user_id, event_id, tickets, bookingCode], (err) => {
                if (err) {
                    return res.status(500).json({ error: "Error creating booking" });
                }

                res.json({
                    message: "Booking successful",
                    booking_code: bookingCode
                });
            });
        });
    });
});

app.get("/users/:id/bookings", (req, res) => {
    const userId = req.params.id;

    const query = `
        SELECT 
            bookings.id,
            events.title,
            events.date,
            bookings.tickets,
            bookings.booking_code
        FROM bookings
        JOIN events ON bookings.event_id = events.id
        WHERE bookings.user_id = ?
    `;

    db.query(query, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error fetching bookings" });
        }

        res.json(result);
    });
});

app.post("/events/:id/attendance", (req, res) => {
    const eventId = req.params.id;
    const { booking_code } = req.body;

    const checkQuery = `
        SELECT tickets FROM bookings 
        WHERE booking_code = ? AND event_id = ?
    `;

    db.query(checkQuery, [booking_code, eventId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error verifying booking" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Invalid booking code" });
        }

        const tickets = result[0].tickets;

        const insertQuery = `
            INSERT INTO attendance (booking_code)
            VALUES (?)
        `;

        db.query(insertQuery, [booking_code], (err) => {
            if (err) {
                return res.status(500).json({ error: "Error marking attendance" });
            }

            res.json({
                message: "Attendance marked",
                tickets: tickets
            });
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});