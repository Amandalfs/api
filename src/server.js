require('express-async-errors')

const migrationsRun = require('./database/sqlite/migrations');
const express = require('express');

const PORT = require('./config/port');
const routes = require('./routes');
const AppError = require('./utils/AppError');

const app = express();

app.use(express.json());
app.use(routes);

migrationsRun();

app.use((error, req, res, next)=>{
    if(error instanceof AppError){
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }

    console.error(error);
    
    return res.status(500).json({
        status: "Error",
        message: "Internal Server Error"
    })
})

app.listen(PORT, ()=>{
    console.log(`O servidor esta rodando a ${PORT}`);
})