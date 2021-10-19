const apiRouter = require('express').Router()
const jwt = require('jsonwebtoken');
const allInvRouter = require('./allInv');
const SECRET = require('./secret');
const sizeRouter = require('./size');



const usersRouter = require('./users')
apiRouter.use(async (req, res, next) => {
    if(req.header('Authorization')) {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            throw new Error('NO TOKEN');
        }
        const token = authHeader.split('Bearer ')[1];
        const { id } = jwt.verify(token, SECRET);
        console.log('HERES YOUR ID', id);
        if(!id) {
            throw new Error('Invalid token!');
        }
        req.user = await getUserById(id);
        console.log(req.user);
        next()
    } else {
        next();
    }
});
apiRouter.get('/health',(req, res, next)=>{
    res.send({message:'something'});
});


apiRouter.use('/users', usersRouter);
apiRouter.use('/allInv', allInvRouter);
apiRouter.use('/size', sizeRouter);


module.exports = apiRouter