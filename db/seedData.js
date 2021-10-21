const client = require('./client');

async function dropTables() {
    console.log('Dropping All Tables...');
    // drop all tables, in the correct order
    await client.query(`
    DROP TABLE IF EXISTS apparel_size;
    DROP TABLE IF EXISTS apparel_cart;
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


async function createInitialApparel() {
  try {
    console.log('Starting to create apparel...');

    const apparelToCreate = [
      {id:'1', name:'Black', type:'shirt', count:'', price:'$30'},
      {id:'2', name:'Blue', type:'shirt', count:'', price:'$30'},
      {id:'3', name:'Red', type:'shirt', count:'', price:'$30'},
      {id:'4', name:'Orange', type:'shirt', count:'', price:'$30'},
     
    ]
    const apparel = await Promise.all(apparelToCreate.map(createApparel));

    console.log('apparel created:');
    console.log(apparel);

    console.log('Finished creating apparel!');
  } catch (error) {
    console.error('Error creating apparel!');
    throw error;
  }
}




async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialApparel();
    } catch (error) {
        console.log('Error during rebuildDB')
        throw error;
    }
}

module.exports = {
    rebuildDB,

};