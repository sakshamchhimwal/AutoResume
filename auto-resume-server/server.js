const CLIENT_ID = "a12b9b0d5b4c0a8f85b3";
const CLIENT_SECRET = "05bfbcb314f7a7fbddfba5dc8c85cd8d707b5436";

let express = require("express");
let cors = require("cors");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
let bodyParser = require("body-parser");
let app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/getAccessToken", async function (req, res) {
  console.log(req.query.code);
  const params =
    "?client _id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;
  await fetch("https://github.com/login/oauth/authorize?client_id");
});

app.listen(4000, () => {
  console.log("cors server listentening");
});
