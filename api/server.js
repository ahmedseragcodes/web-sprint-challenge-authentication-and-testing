const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const restrict = require('./middleware/restricted.js');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', restrict, jokesRouter); // only logged-in users should have access!

//SANITY CHECK ENDPOINT
server.get("/", (req, res, next)=>{
    res.json({message: "API Up"});
});

//Global Error Handling 
server.use((err, req, res, next)=>{
    res.json({
        stack: err.stack,
        message: err.message 
    })
})



module.exports = server;
