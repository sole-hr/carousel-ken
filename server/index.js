require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const db = require("../database");
const cors = require("cors");

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

// Example SKU: 880563-010

// GET One Shoe Item
app.get("/shoe/:sku", (req, res) => {
  const sku = req.params.sku;
  console.log(sku);
  db.findOne({ sku }, results => {
    res.json(results);
  });
});

app.post("/shoe/:sku", (req, res) => {});

app.put("/shoe/:sku", (req, res) => {});

app.delete("/shoe/:sku", (req, res) => {});

// Helper Functions
const getRandomShoe = array => {
  let randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
};

app.listen(process.env.PORT, function() {
  console.log(`listening on port ${process.env.PORT}`);
});
