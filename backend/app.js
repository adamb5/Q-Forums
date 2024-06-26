const express = require("express");
// import express from "express";
const bodyParser = require("body-parser");

const tools = require('../database/database.js');
// import { getEntry } from "../database/database.js";
const app = express();

app.get("/data", async (req, res) => {
    const entries = await tools.getEntry()
    res.send(entries)
})

app.use(bodyParser.urlencoded({extended: false}));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });


const stackRoutes = require('./stack-routes');
app.use('/stack', stackRoutes);


app.listen(5000);

