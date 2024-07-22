const express = require("express");
require("dotenv").config({path: '../.env'});
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
const api_key = process.env.QFORUMS_STACKOVERFLOW_API_KEY;

//api key NIST
const NIST_api_key = process.env.QFORUMS_NIST_API_KEY;

app.post("/api/search", async (req, res) => {
  const { tagged } = req.body;
  const tag = tagged;
  // req.session.tagged = tagged;
  // const tag = req.session.tagged;
  //console.log(tagged);
  const apiUrl = `https://api.stackexchange.com//2.3/search/advanced?&pagesize=100&order=asc&sort=relevance&q=${tagged}&wiki=False&site=stackoverflow&filter=withbody&key=${api_key}`;
  const response = await axios.get(apiUrl);
  const posts = response.data.items;
  
  const apiUrlNIST = `https://services.nvd.nist.gov/rest/json/cves/2.0?keywordSearch=${tagged}`
  const response2 = await axios.get(apiUrlNIST, {
    headers: {
      "x-api-key": NIST_api_key
    }
  })
  const posts2 = response2.data.vulnerabilities;
  //console.log(posts);
  console.log(tag);

  //pool.query(`INSERT `)

  //await tools.truncateTable();

  posts.forEach(async (post) => {
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
    const current_date = new Date();
    let suspicious = 0; //false is 0
    console.log(current_date.getHours());
    console.log(creation_date.getHours());
    console.log(current_date.getHours() - creation_date.getHours() + " " + current_date.getHours() - creation_date.getHours() <= 168);
    console.log(view_count + " " + view_count >= 300);
    if(current_date.getHours() - creation_date.getHours() <= 168 && view_count >= 300){
      suspicious = 1; //true is 1
    }
  
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
      tag,
      suspicious
      // tag
    );
    console.log("THE DB POST IS WORKING");
  });
  //res.status(201).send(entries);
  /*res.json({
    success: true,
    items: posts,
    message: "Data inserted into the database.",
  });*/
  //res.status(201).send(posts);

  posts2.forEach(async (post) => {
    const question_id = post.cve.id;
    const creation_date = post.cve.published;
    const score = 0;
    const reputation = 0;
    const view_count = 0;
    const answer_count = 0;
    const link = "https://www.nist.gov/";
    const title = post.cve.descriptions[0].value;
    const body = post.cve.descriptions[0].value;
    const suspicious = 0; //false is 0

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
      tag,
      suspicious
      // tag
    );
    console.log("THE NIST DB POST IS WORKING");
  });
  //res.status(201).send(entries);
  res.json({
    success: true,
    items: {posts, posts2},
    message: "NIST Data inserted into the database.",
  });
});




app.use(bodyParser.urlencoded({ extended: false }));

const stackRoutes = require("./stack-routes");
app.use("/stack", stackRoutes);

app.listen(5000);
