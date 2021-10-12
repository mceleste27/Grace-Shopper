async function getSizeById(id) {
    try {
        const { rows } = await client.query(`
            SELECT * 
            FROM size
            WHERE id=${id}
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getSizeById
}