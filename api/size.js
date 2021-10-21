const sizeRouter = require('express').Router()
const { getSizeById} = require('../db')

sizeRouter.get('/', async (req, res, next) => {
    try {
        const size = await getSizeById();
        res.send(size)
    } catch (error) {
        next(error)
    }
})

module.exports = sizeRouter