const { Pool } = require('pg')

let connectionDetails = {};

if (process.env.NODE_ENV === "development") {
  connectionDetails = {
    user: 'postgres',
    host: 'localhost',
    database: 'minesweepervs',
    port: 5432
  }
} else {
  connectionDetails = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const psql = new Pool(connectionDetails)

psql.connect()

module.exports = psql