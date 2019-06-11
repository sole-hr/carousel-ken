require("dotenv").config();
require("newrelic");
const cluster = require("cluster");
const os = require("os");
const express = require("express");
const bodyParser = require("body-parser");
const db = require("../database");
const cors = require("cors");
const idGen = require("shortid");

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {
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

  // POST Single Shoe Item
  app.post("/api/item", (req, res) => {
    const newShoe = req.body;
    db.createOne(newShoe, (err, resultOfInsert) => {
      res.json(resultOfInsert);
    });
  });

  // GET RELATED ITEMS FROM ONE SHOE
  app.get("/api/related-items/:sku", (req, res) => {
    const sku = Number(req.params.sku);
    db.findRelatedItems(sku, (err, relatedShoes) => {
      res.json(relatedShoes);
    });
  });

  // GET Single Shoe Item
  app.get("/api/item/:sku", (req, res) => {
    const sku = Number(req.params.sku);
    db.findOne(sku, (err, shoe) => {
      res.json(shoe);
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

  //

  // Helper Functions
  const getRandomShoe = array => {
    let randomIndex = Math.floor(Math.random() * array.length);
    return randomIndex;
  };

  app.listen(process.env.PORT, function() {
    console.log(`listening on port ${process.env.PORT}`);
  });
}

cluster.on("exit", worker => {
  console.log("mayday! mayday! worker", worker.id, " is no more!");
  cluster.fork();
});
