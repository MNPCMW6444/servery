const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);

app.get("/thedata", async (req, res) => {
  try {
    const rp = require("request-promise");
    const theres = {
      method: "GET",
      uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      qs: {
        start: "1",
        limit: "5000",
        convert: "USD",
      },
      headers: {
        "X-CMC_PRO_API_KEY": "bc7d6dba-1611-447d-811b-d045bc389281",
      },
      json: true,
      gzip: true,
    };

    rp(theres)
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        console.log("API call error:", err.message);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});
