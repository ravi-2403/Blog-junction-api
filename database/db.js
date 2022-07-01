const {MongoClient} = require('mongodb');
require('dotenv').config();

global.dbConnection;

const connectToDb = async (cb) => {
    try{
        const client = await MongoClient.connect(process.env.MONGO_URI);
        dbConnection = client.db('test');
        return cb();
    }catch(err){
        console.log("Error ",err.message);
        return cb(err);
    }
}

const getDb = () => dbConnection;


module.exports = {connectToDb,getDb};