const CLIENT_ID = "";
const CLIENT_SECRET = "";

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

app.get("/getRepos/:username", async function (req, res) {
  await fetch(`https://api.github.com/users/${req.params.username}/repos`, {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"),
    },
  }).then(async (response) => {
    const data = await response.json();
    console.log("repos ", data);
    return res.send(data);
  });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
// 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
