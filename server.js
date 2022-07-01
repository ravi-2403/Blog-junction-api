const express = require('express');
const app = express();
const port = process.env.PORT || 3000

const routes = require('./routes/api');
const {connectToDb,getDb} = require('./database/db');

global.db;

connectToDb((err)=>{
    if(!err){
        app.listen(port,()=>{
            console.log("Listening to port ",port);
        })
        db = getDb();
    }
})
app.use(express.json());
// app.use(express.urlencoded({extended:true}));
app.use('/',routes);