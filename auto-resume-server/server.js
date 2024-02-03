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
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;
  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  }).then(async (response) => {
    const data = await response.json();
    console.log(data);
    return res.send(data);
  });
});

app.get("/getUserData", async function (req, res) {
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    },
  }).then(async (response) => {
    const data = await response.json();
    console.log(data);
    return res.send(data);
  });
});

app.listen(8000, () => {
  console.log("cors server listentening");
});
