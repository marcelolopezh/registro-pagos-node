const mongoose = require("mongoose")
const app = require("./app")

const port = process.env.PORT || 4001;

const { API_VERSION, IP_SERVER, DB_PORT, DB} = require("./config")

mongoose.connect(`mongodb://${IP_SERVER}:${DB_PORT}/${DB}`, (err,res)=>{
    if(err){
        throw err;
    }else{
        console.log("CONECTADO A LA DB")
        app.listen(port, ()=>{
            console.log(`${IP_SERVER}:${port}/api/${API_VERSION}`)
        })
    }
})