const express = require("express");
require("dotenv").config({ path: "../.env" });
// const session = require("express-session");
// const crypto = require("crypto");
// import express from "express";
const bodyParser = require("body-parser");
const axios = require("axios");

const WebSocket = require("ws");
const tools = require("../database/database.js");
// import { getEntry } from "../database/database.js";
const app = express();

//Session Management
// const secretKey = crypto.randomBytes(32).toString('hex');

// app.use(session({
//   secret: secretKey,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }));

app.use(express.json());

//WebSocket
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

const clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);
  ws.on("close", () => {
    clients.splice(clients.indexOf(ws), 1);
  });
});

const sendEvent = (data) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

//EC2
const path = require("path");
const _dirname = path.dirname("");
const buildPath = path.join(_dirname, "../frontend/build");

app.use(express.static(buildPath));

app.get("/", function (req, res) {
  res.sendFile(
    path.join(_dirname, "../frontend/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

//Database Route
app.get("/data", async (req, res) => {
  const entries = await tools.getEntry();
  res.send(entries);
});

//api key stackoverflow
const api_key = process.env.QFORUMS_STACKOVERFLOW_API_KEY;

//api key NIST
const NIST_api_key = process.env.QFORUMS_NIST_API_KEY;

async function getPrediction(text) {
  try {
    const response = await axios.post("http://localhost:5001/predict", {
      text,
    });
    console.log(response.data.prediction);
    return response.data.prediction;
  } catch (error) {
    console.log(error);
    return "vulnerability";
  }
}

// const prediction = getPrediction("i would like install r on my laptop mac o x version 1073 i downloaded the last version and i double click on it and it wa installed when i start up i get the following error i searched in internet but i could not solve the problem any help would be appreciated the error are during startup warning message 1 setting lcctype failed using c 2 setting lccollate failed using c 3 setting lctime failed using c 4 setting lcmessages failed using c 5 setting lcpaper failed using c rapp gui 150 6126 x8664appledarwin980 warning youre using a nonutf8 locale therefore only ascii character will work please read r for mac o x faq see help section 9 and adjust your system preference accordingly history restored from usersnemorapphistory");
// console.log(prediction);

async function set_vul() {
  return "vulnerability";
}

//let stack_done = false;

app.post("/api/search", async (req, res) => {
  //stack_done = false;
  await tools.checkAndTruncateTable();
  const { tagged } = req.body;
  const tag = tagged;
  // req.session.tagged = tagged;
  // const tag = req.session.tagged;
  //console.log(tagged);
  const current_time = Math.floor(new Date().getTime() / 1000); //seconds
  const dateOneYear = current_time - 31536000;
  console.log("tagged: " + tagged);
  console.log("cur time" + " " + current_time);
  console.log("one ear time" + " " + dateOneYear);

  const stackApiUrl = `https://api.stackexchange.com//2.3/search/advanced?&pagesize=100&fromdate=${dateOneYear}&order=asc&sort=relevance&q=${tagged}&wiki=False&site=stackoverflow&filter=withbody&key=${api_key}`;
  //const response = await axios.get(apiUrl);
  //const posts = response.data.items;

  const nistApiUrl = `https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${tagged}`;
  try {
    const [stackResponse, nistResponse] = await Promise.all([
      axios.get(stackApiUrl),
      axios.get(nistApiUrl, { headers: { "x-api-key": NIST_api_key } }),
    ]);

    const stackPosts = stackResponse.data.items;
    const nistPosts = nistResponse.data.vulnerabilities;

    const stackPromises = stackPosts.map(async (post) => {
      const {
        question_id,
        score,
        reputation,
        view_count,
        answer_count,
        link,
        title,
        body,
      } = post;
      const creation_date = new Date(post.creation_date * 1000);
      let suspicious = 0; // false is 0

      if (current_time - post.creation_date <= 604835 && view_count >= 300) {
        suspicious = 1; // true is 1
      }

      const text = title.concat(body);
      const label = await getPrediction(text);
      console.log(label);

      const entry = await tools.postEntry(
        question_id,
        creation_date,
        score,
        reputation,
        view_count,
        answer_count,
        link,
        title,
        body,
        tag,
        suspicious,
        label
      );

      sendEvent(entry);
      console.log("StackOverflow DB post is working");
    });

    const nistPromises = nistPosts.map(async (post) => {
      const question_id = post.cve.id;
      const creation_date = post.cve.published;
      const score = 0;
      const reputation = 0;
      const view_count = 0;
      const answer_count = 0;
      const link = "https://www.nist.gov/";
      const title = post.cve.descriptions[0].value;
      const body = post.cve.descriptions[0].value;
      const suspicious = 0; // false is 0
      const label = await set_vul();
      console.log(label);

      const entry = await tools.postEntry(
        question_id,
        creation_date,
        score,
        reputation,
        view_count,
        answer_count,
        link,
        title,
        body,
        tag,
        suspicious,
        label
      );

      sendEvent(entry);
      console.log("NIST DB post is working");
    });

    await Promise.all([...stackPromises, ...nistPromises]);

    stack_done = true;
    res.json({
      success: true,
      message: "Data inserted into the database.",
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
    res.status(500).send("Error fetching data");
  }
});
// const response2 = await axios.get(apiUrlNIST, {
//   headers: {
//     "x-api-key": NIST_api_key,
//   },
// });
// const posts2 = response2.data.vulnerabilities;
//console.log(posts);
//console.log(tag);

//pool.query(`INSERT `)

//await tools.truncateTable();
// async function getPrediction(text) {
//   const response = await axios.post('http://localhost:5001/predict', { text });
//   console.log(response.data.prediction);
//   return response.data.prediction
// }

// const prediction = getPrediction("The configuration tools (1) config.sh in Unix or (2) config.cmd in Windows for BEA WebLogic Server 8.1 through SP2 create a log file that contains the administrative username and password in cleartext, which could allow local users to gain privileges. configuration tool 1 configsh unix 2 configcmd window bea weblogic server 81 sp2 create log file contains administrative username password cleartext could allow local user gain privilege");
// console.log(prediction);
//   await posts.forEach(async (post) => {
//     const {
//       question_id,
//       score,
//       reputation,
//       view_count,
//       answer_count,
//       link,
//       title,
//       body,
//     } = post;
//     const creation_date = new Date(post.creation_date * 1000);
//     const current_time = Math.floor(new Date().getTime() / 1000);
//     let suspicious = 0; //false is 0

//     if (current_time - post.creation_date <= 604835 && view_count >= 300) {
//       suspicious = 1; //true is 1
//     }

//     const text = title.concat(body);

//     const label = await getPrediction(text);
//     console.log(label);
//     //const label = "question";
//     // const {tag} = tagged;
//     await tools.postEntry(
//       question_id,
//       creation_date,
//       score,
//       reputation,
//       view_count,
//       answer_count,
//       link,
//       title,
//       body,
//       tag,
//       suspicious,
//       label
//       // tag
//     );
//     console.log("THE DB POST IS WORKING");
//   });
//   stack_done = true;
//   //res.status(201).send(entries);
//   /*res.json({
//     success: true,
//     items: posts,
//     message: "Data inserted into the database.",
//   });*/
//   //res.status(201).send(posts);

//   await posts2.forEach(async (post) => {
//     const question_id = post.cve.id;
//     const creation_date = post.cve.published;
//     const score = 0;
//     const reputation = 0;
//     const view_count = 0;
//     const answer_count = 0;
//     const link = "https://www.nist.gov/";
//     const title = post.cve.descriptions[0].value;
//     const body = post.cve.descriptions[0].value;
//     const suspicious = 0; //false is 0
//     //const label = "vulnerability";
//     const label = await set_vul();
//     console.log(label);

//     // const {tag} = tagged;
//     await tools.postEntry(
//       question_id,
//       creation_date,
//       score,
//       reputation,
//       view_count,
//       answer_count,
//       link,
//       title,
//       body,
//       tag,
//       suspicious,
//       label
//       // tag
//     );
//     console.log("THE NIST DB POST IS WORKING");
//   });
//   //res.status(201).send(entries);
//   stack_done = true;
//   res.json({
//     success: true,
//     items: { posts, posts2 },
//     message: "NIST Data inserted into the database.",
//   });
// });

app.use(bodyParser.urlencoded({ extended: false }));

const stackRoutes = require("./stack-routes");
app.use("/stack", stackRoutes);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});
app.listen(5000);
