async function getApparelSizeById(id) {
    try {
        const { rows } = await client.query(`
            SELECT * 
            FROM apparel_size
            WHERE id=${id}
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getApparelSizeByApparel({ id }) {
    try {
        const { rows } = await client.query(`
            SELECT * 
            FROM apparel_size
            WHERE "apparelId" = ${id};
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getApparelSizeById,
    getApparelSizeByApparel
}