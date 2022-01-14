const express = require("express");
const webpush = require("web-push");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "client")));

const port = process.env.PORT || 5000;

const pubKey =
  "BDPknGIKMSNfFGKYU0UnoJJtgb33Zupuv2Lm-tb1n2ttd24mPMr7Ai_VUrSSbaBLbRTYcu2PTIhTj-Hu6qTMuzU";
const prtKey = "Tphrzpar1nWjhY52s39ij0aRq_Jp1roGc-79s8wBx3A";

webpush.setVapidDetails("mailto:pantsflow@gmail.com", pubKey, prtKey);

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

app.post("/createnotf", (req, res) => {
  const subs = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({ title: "Push test" });

  webpush.sendNotification(subs, payload).catch((err) => console.errror(er));
});
