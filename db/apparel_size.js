async function getApparelSizeById(id) {
    try {
        const {rows} = await client.query(`
            SELECT * 
            FROM apparel_size
            WHERE id=${id}
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}