require('express-async-errors')

const express = require('express');
const cors = require('cors');

const PORT = require('./config/port');
const routes = require('./routes');
const AppError = require('./utils/AppError');
const uploadConfig = require('./config/upload');

const app = express();

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(express.json());
app.use(cors())
app.use(routes);

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