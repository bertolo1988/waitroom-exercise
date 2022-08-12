# waitroom-exercise

## requirements

- node.js v16.16.0

- PostgreSQL v14.4

## Run postgreSQL using docker

```
docker run
    --name myPostgresDb
    -p 5455:5432
    -e POSTGRES_USER=postgresUser
    -e POSTGRES_PASSWORD=postgresPW
    -e POSTGRES_DB=postgresDB
    -d
    postgres
```

## Install dependencies

`npm i`

## Run migrations

`npm run migrate up`

## Data seed

`npm run seed`

## Tests

`npm run test`

(don't forget to seed the data before)

## How to run

`npm run dev`

## Create migration

```
# creates a migration with the name text
npm run migrate -- create --name text.sql
```

## Undo last migration

`npm run migrate down`

For more information check [here](https://github.com/mmkal/slonik-tools/tree/master/packages/migrator#readme).
