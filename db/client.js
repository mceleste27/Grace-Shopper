const { Client } = require('pg')

const client = new Client('postgres://postgres@localhost:5432/shopping-dev');


module.exports = client