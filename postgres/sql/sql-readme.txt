the .sql files in this folder can be used
to setup & populate the postgres database.

for example, to create a new postgres database:
- install postgres + add postgres to PATH

- verify that postgres cli (psql) is available
$ psql --version

- create a postgres database
$ createdb mydb

- setup the database
$ psql -d mydb -f path/to/setup.sql

- populate the database
$ psql -d mydb -f path/to/populate.sql