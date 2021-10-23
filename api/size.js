const sizeRouter = require('express').Router()
const { getSizeById} = require('../db')

sizeRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const size = await getSizeById(id);
        res.send(size)
    } catch (error) {
        next(error)
    }
})

module.exports = sizeRouter