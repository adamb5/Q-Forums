const express = require("express");
// import express from "express";
const bodyParser = require("body-parser");
const axios = require("axios");

const tools = require("../database/database.js");
// import { getEntry } from "../database/database.js";
const app = express();



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

app.post("/api/search", async (req, res) => {
  const { tagged } = req.body;
  //console.log(tagged);
  const apiUrl = `https://api.stackexchange.com//2.3/search/advanced?&pagesize=100&order=asc&sort=relevance&q=${tagged}&wiki=False&site=stackoverflow&filter=withbody&key=rl_pGoKbHjsUR63zEp1CCStTP8Z4`;
  const response = await axios.get(apiUrl);
  const posts = response.data.items;
  //console.log(posts);

  await tools.truncateTable();
  console.log("table is truncated");

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
    await tools.postEntry(
      question_id,
      creation_date,
      score,
      reputation,
      view_count,
      answer_count,
      link,
      title,
      body
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
