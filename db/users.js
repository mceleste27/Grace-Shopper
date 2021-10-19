const client = require("./client.js");
const bcrypt = require("bcrypt");

async function createUser({ username, password }) {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
    try {
        const { rows: [user] } = await client.query(`
        INSERT INTO users( username, password)
        VALUES($1, $2)
        RETURNING *;
    `, [username, password]);

        delete user.password;

        return user;
    } catch (error) {
        throw error;
    }
}

async function getUser({ username, password }) {
    try {
        const user = await getUserByUsername(username)
        // const { rows: [ user ] } = await client.query(`
        // SELECT (username, password)
        // FROM users;
        // `,);
        if (password === user.password) {
            delete user.password
            return user
        }

        return
    } catch (error) {
        console.error(error)

    }

}

async function getUserById(id) {
    try {
        const { rows: [user] } = await client.query(`
    SELECT * 
    FROM users
    WHERE id = ${id}
    `);
        return user
    } catch (error) {
        console.error(error)

    }
}

async function getUserByUsername(username) {
    try {
        const { rows: [user] } = await client.query(`
    SELECT *
    FROM users
    WHERE username = $1
    `, [username]);
        return user
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
    client
}