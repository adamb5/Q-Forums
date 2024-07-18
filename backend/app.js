const express = require("express");
// const session = require("express-session");
// const crypto = require("crypto");
// import express from "express";
const bodyParser = require("body-parser");
const axios = require("axios");

const { v4: uuidv4 } = require("uuid");

const tools = require("../database/database.js");
// import { getEntry } from "../database/database.js";
const app = express();

const random_uuid = uuidv4();

//Session Management
// const secretKey = crypto.randomBytes(32).toString('hex');

// app.use(session({
//   secret: secretKey,
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }));

app.use(express.json());

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
//const api_key = `${process.env.QFORUMS_STACKOVERFLOW_API_KEY}`;

app.post("/api/search", async (req, res) => {
  const { tagged } = req.body;
  // req.session.tagged = tagged;
  // const tag = req.session.tagged;
  //console.log(tagged);
  const apiUrl = `https://api.stackexchange.com//2.3/search/advanced?&pagesize=100&order=asc&sort=relevance&q=${tagged}&wiki=False&site=stackoverflow&filter=withbody&key=rl_fTwPBMrkm1L3yigJUSHY6BJmY`;
  const response = await axios.get(apiUrl);
  const posts = response.data.items;
  //console.log(posts);
  console.log(tagged);

  //pool.query(`INSERT `)

  //await tools.truncateTable();

  posts.forEach(async (post) => {
    const {
      question_id,
      creation_date,
      score,
      reputation,
      view_count,
      answer_count,
      link,
      title,
      body,
    } = post;
    // const {tag} = tagged;
    await tools.postEntry(
      question_id,
      creation_date,
      score,
      reputation,
      view_count,
      answer_count,
      link,
      title,
      body,
      tagged
      // tag
    );
    console.log("THE DB POST IS WORKING");
  });
  //res.status(201).send(entries);
  res.json({
    success: true,
    items: posts,
    message: "Data inserted into the database.",
  });
  //res.status(201).send(posts);
});

app.use(bodyParser.urlencoded({ extended: false }));

const stackRoutes = require("./stack-routes");
app.use("/stack", stackRoutes);

app.listen(5000);
