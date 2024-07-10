const express = require('express');
const router = express.Router();


const stackController = require('./stack-controller');


//stack api route below
router.get('/getreq', stackController.getFormResults);

//stack api route below
router.get('/getans/:tagged', stackController.getResult);

//router.get('/data', app.getEntries());


module.exports = router;