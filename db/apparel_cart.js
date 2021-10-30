//update quantity and or delete

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

async function updateApparelQuantity({id}) {
    try {
        const {rows: [updatedApparel]} = await client.query(`
            UPDATE apparel_cart
            SET name=$1
            WHERE id=${id}
            RETURNING *;
        `,);
        return updatedApparel;
    } catch (error) {
        throw error;
    }
}

async function destroyApparel(id) {
    try {
        const { rows } = await client.query(`
        DELETE FROM apparel_cart
        WHERE "apparelId" = ${id} 
        `,[id]);
        return rows
    } catch (error) {
        console.error(error)

    }
}
async function addToCart(apparelId, userId){
    try {
        const { rows }= await client.query(`
        INSERT INTO apparel_cart("apparelId", "userId")
        VALUES($1, $2);
        `,[apparelId, userId]);
        return rows
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = {
    getApparelCartById,
    getApparelCartByApparel,
    getApparelCartByUserId,
    updateApparelQuantity,
    destroyApparel,
    addToCart
}