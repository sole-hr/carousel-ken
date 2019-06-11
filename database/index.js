require("dotenv").config();
const Promise = require("bluebird");
const knex = require("knex")({
  client: "pg",
  connection: process.env.POSTGRES_URL,
  pool: {
    afterCreate: function(conn, done) {
      // in this example we use pg driver's connection API
      conn.query('SET timezone="UTC";', function(err) {
        if (err) {
          // first query failed, return error and don't try to make next query
          done(err, conn);
        } else {
          console.log("CONNECTED TO PG");
          done(err, conn);
        }
      });
    }
  }
});

const createOne = (shoeObj, cb) => {
  // get highest index in db
  let insertIndex = null;

  // EXECUTE PROMISES IN SERIES
  const retrieveIndexPromise = knex("shoe")
    .max("sku")
    .then(highestIndex => {
      [insertIndex] = highestIndex;
      shoeObj["sku"] = insertIndex.max + 1;
      knex("shoe")
        .insert(shoeObj)
        .then(resultOfInsert => {
          cb(null, resultOfInsert);
        })
        .catch(err => {
          cb(err, null);
        });
    })
    .catch(err => {
      console.error(err);
    });
};

const findOne = (sku, cb) => {
  // return item from "shoe" table
  knex("shoe")
    .where({
      sku: sku
    })
    .then(shoe => {
      cb(null, shoe);
    })
    .catch(err => {
      cb(err, null);
    });
};

const findRelatedItems = (featuredItemSKU, cb) => {
  knex("related_shoe")
    .innerJoin("shoe", "related_shoe.main_sku", "=", "shoe.sku")
    .where("main_sku", featuredItemSKU)
    .then(relatedShoes => {
      cb(null, relatedShoes);
    })
    .catch(err => {
      cb(err, null);
    });
};

module.exports = { findOne, findRelatedItems, createOne };
