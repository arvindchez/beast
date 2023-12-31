## Steps to run the application
1) Execute > **git clone https://github.com/arvindchez/beast.git**
2) Execute > **npm install**
3) Execute > **npm run reset_db**
4) To run the test cases, Execute >  **npm run test**
5) To run the application and test using CURL/Postman,
    - Execute > **npm run dev**
    - Available url's:
        - (GET) http://localhost:3000/bikes - No authentication token required
        - (GET) http://localhost:3000/bikes/1 - No authentication token required
        - (GET) http://localhost:3000/locations - No authentication token required
        - (GET) http://localhost:3000/locations/1 - No authentication token required
        - (GET) http://localhost:3000/users - Authentication token required. Sample token : **1234**
        - (GET) http://localhost:3000/users/1 - Authentication token required. Sample token : **1234**
        - (GET) http://localhost:3000/bookings - Authentication token required. Sample token : **1234**
        - (GET) http://localhost:3000/bookings/1 - Authentication token required. Sample token : **1234** 
        - (POST, To create bookings) http://localhost:3000/bookings - Authentication token required. Sample token : **1234** and sample body is given below. 
           > {
                "user_id": 1,
                "bike_id": 1,
                "start_at": "2023-11-22",
                "end_at": "2023-11-23"
            }



 
 
 ## Home Test Task for Beast

Here's a small project that we would like you to work on. We expect candidates to spend on average 3 hours on this, please do not spend over half a day on this.
You're not required to complete all tasks and can feel free to skip some.
What matters is code quality, reliability, and stability. We want you to do some great work, be proud of it, and have fun.
Quality matters a lot more than quantity.

You can feel free to change a bit the requirements and/or the dependencies (e.g. you might feel more comfortable with another framework such as Koa, or another database).

## Project Overview

We would like to allow people to book bikes from our fleet.
We have them available in many locations.
Each citizen will be given a private token to be used for making a reservations.

Your goal is to prepare an API for making and cancelling bookings.

## Requirements

- Each citizen could spend 100 units of currency per calendar month on a rides. Paid booking are not supported yet.
- Booking time unit is a day.
- Same bike bookings cannot overlap.
- Bookings of a single person can't overlap.
- A person could have no more than 3 bookings scheduled in the future.
- Bikes and locations data is public, but bookings require token.
- Booking need to be made at least three days ahead.

**Let's divide this goal into smaller steps:**

- prepare authentication mechanism
- extend database structure to store booking information
- create new api endpoint, sample request:

```shell
curl --location --request POST 'localhost:3000/bookings' \
--header 'Authorization: Bearer my_secret_token_123' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user_id": 1,
    "bike_id": 3,
    "start_at": "2022-06-01",
    "end_at": "2022-06-05"
}'
```

- add tests

```

## Final notes

We have picked SQLite as a database for the sake of simplicity: no prior knowledge of this database is required to do this task.

```
