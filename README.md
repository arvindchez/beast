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
