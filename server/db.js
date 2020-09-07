const { Client } = require('pg')

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
    ssl: true
  }
}

const client = new Client(connectionDetails)

client.connect()

module.exports = client