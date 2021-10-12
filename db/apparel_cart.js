async function getApparelCartById(id) {
    try {
        const {rows} = await client.query(`
            SELECT * 
            FROM apparel_cart
            WHERE id=${id}
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}