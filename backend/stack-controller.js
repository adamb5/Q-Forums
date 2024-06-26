const axios = require("axios");



const getFormResults = (req, res, next) => {
    //const tagged = req.params.tagged;
    console.log("tagged: " + tagged);
    res.send(`<form action="/stack/getans" method="GET"><input type="text" name="keyword"> <button type="submit"> Enter Search </button></form>`);
};


const getResult = (request, response, next) => {
    const tagged = request.params.tagged;
    console.log("tagged: " + tagged);
    axios
        .get(`https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&tagged=${tagged}&site=stackoverflow`)
        .then((res) => {
            //response.send('<h1> User' + '</h1>');
            response.json(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
    };
    


exports.getFormResults = getFormResults;
exports.getResult = getResult;