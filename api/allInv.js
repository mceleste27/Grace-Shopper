


const allInvRouter = require('express').Router();
const { getAllApparel, getApparelById, createApparel } = require('../db')

allInvRouter.get('/', async (req, res, next) => {
    try {
        const apparel = await getAllApparel();
        res.send(apparel);

    } catch (error) {
        next(error);
    }
});
allInvRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const apparel = await getAllApparelById(id);
        res.send(apparel);

    } catch (error) {
        next(error);
    }
});

allInvRouter.post('/' , async (req, res, next) => {
    try {
        const createApparel = await createApparel(req.body)
        res.send(createApparel)
    } catch (error) {
        next(error)
    }
})
module.exports = allInvRouter