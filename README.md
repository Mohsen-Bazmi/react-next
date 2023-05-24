## How to run the project

First, run the db.

## How to start the database server

> Ensure that docker compose is installed on your machine.

Run the following command in the project's [root path](./) to start the database server.
```bash
docker compose up
```
## How to test the db connection

> Ensure that `psql` is already installed on your machine.

Run the following command in terminal.
```bash
psql -h localhost -p 5433 -U prisma -d car_rental
```
And type `prisma` when it asks you for the password.

## How to apply the migrations
The next step is to apply the migraions.

Run `npx prisma migrate dev`.

## How to run the tests
To run the tests run the following command in the project's root.
```bash
npm test
```

## Coverage report
Run `npm run test-coverage` then open the [coverage/lcov-report/index.html](./coverage/lcov-report/index.html) file in your browser.

## Using real database in tests
To use a real db in tests simply pass the real repository in. But ensure that the db is running and it's accessible through the connection string in the `.env` file.


## How to run the app

Run the following command in the project's [root path](./) to start the development server.
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.