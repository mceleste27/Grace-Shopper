const client = require("./client.js");


async function getAllApparel() {
    try {
        const { rows } = await client.query(`
            SELECT * 
            FROM apparel
        `);
        return rows;
    } catch(error) {
        throw error;
    }
}

async function getApparelById(id) {
    try {
        const { rows: [apparel] } = await client.query(`
            SELECT * 
            FROM apparel
            WHERE id=${id}
        `);

        return apparel;
    } catch (error) {
        throw error;
    }
}


async function createApparel({ type, img, count, price, name}) {
    try {
        const queryString = `
            INSERT INTO apparel( type,img, count, price, name)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const {rows} = await client.query(queryString, [ type,img, count, price, name]);
        return rows;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getAllApparel,
    getApparelById,
    createApparel
}