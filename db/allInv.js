async function getAllApparel() {
    try {
        const {rows} = await client.query(`
            SELECT * 
            FROM apparel
        `);
        return rows;
    } catch {
        throw error;
    }
}

async function getApparelById(id) {
    try {
        const {rows: [apparel]} = await client.query(`
            SELECT * 
            FROM apparel
            WHERE id=${id}
        `);

        return apparel;
    } catch (error) {
        throw error;
    }
}