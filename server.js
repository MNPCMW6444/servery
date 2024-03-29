const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(bodyparser.json());

app.listen(port, () => {
  console.log(`Server Running at localhost:${port}`);
});
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://competent-bhabha-69ad15.netlify.app",
    ],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
//https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=0x9505dbD77DaCD1F6C89F101b98522D4b871d88C5&address=0x1b6fD1C466d5b8380bF8eDc2b7C0a3fC1f892E56&page=1&offset=5&startblock=0&endblock=999999999&sort=asc&apikey=41ZFPTAU8UR5GAKUHQCEXG586N198FW2MH

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
        "X-CMC_PRO_API_KEY": "56c91bfd-e6e5-4d96-8dff-ae00466e01c0",
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
