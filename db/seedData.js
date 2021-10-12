const client = require('./client');

async function dropTables() {
    console.log('Dropping All Tables...');
    // drop all tables, in the correct order
    await client.query(`
    DROP TABLE IF EXISTS apparel_size;
    DROP TABLE IF EXISTS cart_apparel;
    DROP TABLE IF EXISTS cart ;
    DROP TABLE IF EXISTS apparel;
    DROP TABLE IF EXISTS size;
    DROP TABLE IF EXISTS users;
    `)
}

async function createTables() {
    console.log('Creating Tables...');
    await client.query(`
      CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
        );
      CREATE TABLE size(
        id SERIAL PRIMARY KEY
      );
      CREATE TABLE apparel(
         id SERIAL PRIMARY KEY,
         type UPPER(string),
         count INTEGER,
         price INTEGER,
         name VARCHAR(255) NOT NULL
      );
      CREATE TABLE apparel_cart(
        id SERIAL PRIMARY KEY,
        "apparelId" INTEGER REFERENCES apparel(id),
        "userId" INTEGER REFERENCES users(id)
      );
      CREATE TABLE apparel_size(
        id SERIAL PRIMARY KEY,
        "apparelId" INTEGER REFERENCES apparel(id),
        "sizeId" INTEGER REFERENCES size(id)  
      );
      `)
}


async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
    } catch (error) {
        console.log('Error during rebuildDB')
        throw error;
    }
}

module.exports = {
    rebuildDB,

};