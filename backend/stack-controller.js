const axios = require("axios");

const getFormResults = (req, res, next) => {
  //const tagged = req.params.tagged;
  console.log("tagged: " + tagged);
  res.send(
    `<form action="/stack/getans" method="GET"><input type="text" name="keyword"> <button type="submit"> Enter Search </button></form>`
  );
};

// let completeData = [];

const getResult = (request, response, next) => {
  const tagged = request.params.tagged;
  console.log("tagged: " + tagged);
  for (let i = 0; i < 4; i++) {
    axios
      .get(
        `https://api.stackexchange.com//2.3/search/advanced?page=${
          i + 1
        }&pagesize=100&order=asc&sort=relevance&q=${tagged}&wiki=False&site=stackoverflow&key=rl_pGoKbHjsUR63zEp1CCStTP8Z4`
      )
      .then((res) => {
        //response.send('<h1> User' + '</h1>');
        response.json(res.data);
        //response.send(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

exports.getFormResults = getFormResults;
exports.getResult = getResult;

// async function fetchData() {
//   try {
//     for (let i = 0; i < 150; i++) {
//       const response = await axios.get(
//         "https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&taggedsite=stackoverflow"
//       );
//       const newData = response.data;
//       newData.items.forEach((item) => {
//         completeData.push(item);
//       });
//     }
//     // Write completeData to a file (optional)
//     fs.writeFileSync(
//       "stackoverflow_data.json",
//       JSON.stringify(completeData, null, 2)
//     );
//     console.log("Data fetched and saved successfully.");
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// fetchData();
