require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("../database");
const cors = require("cors");
const idGen = require("shortid");

const app = express();

app.use(cors());
app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enter routes below
app.get(`/shoes`, (req, res) => {
  db.findAll((err, shoes) => {
    if (err) {
      console.log("error returning shoes from db", err);
      res.statusCode = 400;
      res.end();
    } else {
      let shoeCount = 0;
      let shoeArray = [];
      while (shoeCount < 12) {
        let randomIndex = getRandomShoe(shoes);
        shoeArray.push(shoes[randomIndex]);
        shoeCount++;
      }
      res.statusCode = 200;
      res.send(shoeArray);
    }
  });
});

////////////////////////////////////////////////////////////
// GET RELATED ITEMS FROM ONE SHOE
app.get("/api/related-items/:sku", (req, res) => {
  const sku = Number(req.params.sku);
  db.findRelatedItems(sku, (err, relatedShoes) => {
    res.json(relatedShoes);
  });
});

app.delete("/api/related-items/:sku", (req, res) => {
  const sku = Number(req.params.sku);
  db.deleteRelatedItems(sku, (err, deletedRelatedShoes) => {
    res.json({ "deleted-entry": deletedRelatedShoes });
  });
});

app.post("/api/related-items", (req, res) => {
  db.createOne(req.body, console.log);
});
// UPDATE One Shoe Item using SKU
app.put("/api/shoe/:sku", (req, res) => {
  const { sku } = req.params;
  const valuesToUpdate = req.body;

  db.updateOne(sku, valuesToUpdate, updatedItem => {
    res.json({ sku: sku, updatedValues: valuesToUpdate });
  });
});




// Helper Functions
const getRandomShoe = array => {
  let randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
};

app.listen(process.env.PORT, function() {
  console.log(`listening on port ${process.env.PORT}`);
});
