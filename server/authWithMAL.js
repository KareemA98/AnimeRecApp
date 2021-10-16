
const axios = require("axios")
const { MongoClient } = require('mongodb');
const url = "mongodb+srv://admin:foo@ara-database.8aiy8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);
const querystring = require('querystring');
const randomstring = require("randomstring");

exports.SessionCreation = async (code, challenge) => {
    console.log(challenge)
    return axios.post("https://myanimelist.net/v1/oauth2/token", querystring.stringify({
        client_id: "98ffcb05491c6a0d5c69cecfcb92a2d2",
        client_secret: "4454c0e7f4fb17e3855a8177d77be49efdf9d3246d48f836eea7078e719ff344",
        code: code,
        code_verifier: challenge,
        grant_type: "authorization_code"
    }))
        .then(async (res) => {
            try {
                await client.connect();
                console.log("Connected correctly to server");
                const db = client.db("ara-database");
                const col = db.collection("sessions");
                const session = randomstring.generate()
                let personDocument = {
                    "_id": session,
                    "accessToken": res.data.access_token,
                    "refreshToken": res.data.refresh_token
                }
                // Insert a single document, wait for promise so we can read it back
                const p = await col.insertOne(personDocument);
                return session
            } catch (err) {
                console.log(err.stack);
                return "fail"
            }
            finally {
                await client.close();
            }
        })
        .catch()
}