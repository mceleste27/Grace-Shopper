const allInvRouter = require('express').Router();
const {getAllApparel, getApparelById} = require('../db')

allInvRouter.get('/', async (req, res, next) => {
    try {
        const apparel = await getAllApparel();
        res.send(apparel);

    } catch (error) {
        next(error);
    }
});
module.exports = allInvRouter