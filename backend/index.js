const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;

const boredape = require("./boredape.json");
const doodles = require("./doodles.json");
const azuki = require("./azuki.json");
const meebits = require("./meebits.json");
const moonbirds = require("./moonbirds.json");
const coolcats = require("./coolcats.json");

const path = require("path");

const buildPath = path.join(__dirname, "../frontend/build");

app.use(express.static(buildPath));
app.use(cors());

const files = [
  {
    contract: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
    data: doodles,
  },
  {
    contract: "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
    data: azuki,
  },
  {
    contract: "0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7",
    data: meebits,
  },
  {
    contract: "0x1A92f7381B9F03921564a437210bB9396471050C",
    data: coolcats,
  },
  {
    contract: "0x23581767a106ae21c074b2276D25e5C3e136a68b",
    data: moonbirds,
  },
  {
    contract: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    data: boredape,
  },
];


app.get("/nftCollection", async (req, res) => {
  const { query } = req;

  let data;

  try{
    data = files.find((e)=> e.contract === query.contract).data
  } catch(e){
    return res.status(400);
  }

  return res.status(200).json(data);
});


app.get("/*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});


app.listen(port, () => {
  console.log(`Listening for API Calls`);
});


