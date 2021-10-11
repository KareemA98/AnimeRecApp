const { response } = require("express");
const express = require("express");
const apiCalls = require("./apiCalls");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", async (req, res) => {
    const data = await apiCalls.getDataAboutAnime()
    res.send(data);
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});