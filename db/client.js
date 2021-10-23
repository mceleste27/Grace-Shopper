const { Client } = require('pg')
const { DATABASE_URL = 'postgres://postgres@localhost:5432/shopping-dev' } = process.env;
const client = new Client(DATABASE_URL);


module.exports = client