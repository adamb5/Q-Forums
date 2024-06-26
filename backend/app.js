//const express = require("express");
import express from "express";
//const bodyParser = require("body-parser");

//const tools = require('../database/database.js')
import { getEntry } from "../database/database.js";
const app = express();

app.get("/data", async (req, res) => {
    const entries = await getEntry()
    res.send(entries)
})

app.listen(5000);
