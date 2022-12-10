const PORT=5555
const express=require('express');
const https=require('https')
const fs=require('fs')
const path=require('path')
const connect = require('./Config/db.config');
const router=require('./router')
const cors=require('cors')
const serverless = require('serverless-http');
require('dotenv').config()
const app=express();
app.use(cors())
app.use(express.json())
app.use('/',router);
async function start() {
    await connect()
    app.listen(PORT, () => {

        console.log("Connected at " + PORT)
    })
    // const sslServer=https.createServer({
    //     key:fs.readFileSync(path.join(__dirname,'key.pem')),
    //     cert:fs.readFileSync(path.join(__dirname,'cert.pem'))
    // },app);
    // sslServer.listen(PORT,()=>console.log("connected at "+PORT))
   return serverless(app)

};
start()
module.exports=app