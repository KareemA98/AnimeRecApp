const { response } = require("express");
const express = require("express");
const apiCalls = require("./apiCalls");
const randomstring = require("randomstring");
const crypto = require("crypto");
const base64url = require("base64url");
const axios = require("axios")
const querystring = require('querystring');
const authWithMAL = require('./authWithMAL')
const path = require('path');

const PORT = process.env.PORT || 3001;


const app = express();

app.use(express.json());

const { MongoClient } = require('mongodb');
const url = "mongodb+srv://admin:foo@ara-database.8aiy8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);

client.connect()
.then(client=>{
  console.log("Connected correctly to server")
  const db = client.db("ara-database")

  app.use(express.static(path.resolve(__dirname, '../client/build')));

  app.post("/getImage", async (req, res) => {
    console.log(req.body)
    const data = await apiCalls.getImage(req.body.malID, req.body.session, db)
    res.send({data:data})
  });
  
  app.post("/getTagInfo", async (req, res) => {
    console.log(req.body)
    const data = await apiCalls.getTagsInfo(req.body.tag)
    res.json(data)
  })

  app.post("/auth", async (req, res) => {
    const data = await authWithMAL.SessionCreation(req.body.code, req.body.challenge)
    res.send(data)
  });
  
  app.get("/api", async (req, res) => {
    const data = await apiCalls.anotherTry()
    res.send(data)
  });

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
  
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
})