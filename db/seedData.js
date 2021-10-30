const client = require('./client');
const { createApparel }= require('./')

async function dropTables() {
    console.log('Dropping All Tables...');
    // drop all tables, in the correct order
    await client.query(`
    DROP TABLE IF EXISTS apparel_size;
    DROP TABLE IF EXISTS apparel_cart;
    DROP TABLE IF EXISTS apparel CASCADE;
    DROP TABLE IF EXISTS size;
    DROP TABLE IF EXISTS users CASCADE;
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
         type VARCHAR(255),
         count INTEGER,
         price VARCHAR(255),
         name VARCHAR(255) NOT NULL,
         image VARCHAR(255) UNIQUE NOT NULL,
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
      {id:'1', name:'Black', image:'double_black.png', type:'shirt', count:0, price:'$30'},
      {id:'2', name:'White', image:'double_white.png', type:'shirt', count:0, price:'$30'},
      {id:'3', name:'Red', image:'double_red.png', type:'shirt', count:0, price:'$30'},
      {id:'4', name:'Orange', image:'double_orange.png', type:'shirt', count: 0, price:'$30'},
      {id:'5', name:'Blue', image:'double_blue.png', type:'shirt', count: 0, price:'$30'}
     
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
        console.log(error)
        throw error;
    }
}

module.exports = {
    rebuildDB,

};