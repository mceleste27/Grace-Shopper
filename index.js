const express = require('express')
const server = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const { PORT = 3000 } = process.env;
const client = require ('./db/client')
client.connect()

const apiRouter = require('./api');



server.use(cors())
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use((error, req, res, next) => {
    console.log('SETTING THE STATUS');
    res.status(500);
    res.send(error);
});




server.use('/api', apiRouter);

server.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});