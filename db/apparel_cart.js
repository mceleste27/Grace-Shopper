async function getApparelCartById(id) {
    try {
        const { rows } = await client.query(`
            SELECT * 
            FROM apparel_cart
            WHERE id=${id}
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}
async function getApparelCartByUserId(id) {
    try {
        const { rows } = await client.query(`
            SELECT * 
            FROM apparel_cart
            WHERE "usersId" =${id}
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getApparelCartByApparel({ id }) {
    try {
        const { rows } = await client.query(`
            SELECT * 
            FROM apparel_cart
            WHERE "apparelId" = ${id};
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getApparelCartById,
    getApparelCartByApparel,
    getApparelCartByUserId
}