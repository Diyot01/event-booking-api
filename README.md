# Event Booking API

## Setup Instructions

1. Clone the repository
git clone <your-repo-link>

2. Install dependencies
npm install

3. Setup MySQL
- Create database: event_booking
- Run schema.sql file

4. Update DB config
- Open db.js
- Add your MySQL username and password

5. Run server
node server.js

## API Endpoints

GET /events  
POST /events  
POST /bookings  
GET /users/:id/bookings  
POST /events/:id/attendance