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


async function createApparel({id, type, count, price, name}) {
    try {
        const queryString = `
            INSERT INTO apparel({id, type, count, price, name)
            VALUES($1, $2, $3, $3, $4)
            RETURNING *;
        `;
        const {rows} = await client.query(queryString, [id, type, count, price, name]);
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