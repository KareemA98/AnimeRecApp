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
    const data = await apiCalls.getImage(req.body.malID, req.body.session, db)
    res.send({data:data})
  });
  
  app.post("/getTagInfo", async (req, res) => {
    const data = await apiCalls.getTagsInfo(req.body.tag, req.body.completed, req.body.page)
    res.json(data)
  });


  app.post("/getMALList", async (req, res) => {
    const data = await apiCalls.getMALList(req.body.session, db)
    const obj = {} 
    data.forEach(element => {
      obj[element.node.id] = element.list_status.status
    });
    res.send(obj)
  })

  app.post("/AddToMal", async (req, res) => {
    const data = await apiCalls.AddToMal(req.body.session, req.body.id, db)
    res.send(data)
  })


  app.get("/search", async (req, res) => {
    console.log(req.query.term)
    const data = await apiCalls.search(req.query.term)
    const justNames = data.data.Page.media.map((show => show.title.english ? show.title.english : show.title.romaji)) 
    res.send(justNames)
  })

  app.post("/auth", async (req, res) => {
    const data = await authWithMAL.SessionCreation(req.body.code, req.body.challenge)
    res.send(data)
  });
  
  app.post("/getShow", async (req, res) => {
    const data = await apiCalls.anotherTry(req.body.show)
    res.send(data)
  });

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
  
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
})