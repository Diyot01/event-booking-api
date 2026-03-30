# Event Booking API

A backend system to manage events and ticket bookings. Users can view events, book tickets, and mark attendance.

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* Swagger (OpenAPI)

---

## Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/Diyot01/event-booking-api.git
cd event-booking-api
```

### 2. Install dependencies

```
npm install
```

### 3. Setup Database

* Create a MySQL database or use Railway
* Run the `schema.sql` file to create required tables

### 4. Configure Environment Variables

Set the following environment variable:

```
MYSQL_URL=your_mysql_connection_url
```

### 5. Run the server

```
node server.js
```

Server will run on:

```
http://localhost:3000
```

---

## API Endpoints

* GET /events
* POST /events
* POST /bookings
* GET /users/:id/bookings
* POST /events/:id/attendance

---

## Deployment

The application is deployed on Render and connected to a cloud MySQL database hosted on Railway.

Live URL:

```
https://event-booking-api-p2dv.onrender.com
```

---

## Project Structure

```
event-booking-api/
│── server.js
│── db.js
│── schema.sql
│── swagger.yaml
│── package.json
```

---

## Notes

* Ticket availability is checked before booking
* Remaining tickets are updated after each booking
* Booking code is used for attendance tracking

---

## Author

Diyot
