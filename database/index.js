const mongoose = require("mongoose");
// const dbinfo = require('./pw.js');

//const shoes = require('../../shoe-data-generator/shoeData.json');

mongoose.connect(`mongodb://localhost/sdc`, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("we are connected to Mongo database!");
});

let carouselSchema = mongoose.Schema({
  productName: String,
  sku: Number,
  category: String,
  color: String,
  price: Number,
  images: String,
  relatedShoes: String
});

let CarouselItem = mongoose.model("Carousel", carouselSchema, "carousel");

const findAll = (obj, callback) => {
  CarouselItem.find(obj, (err, shoes) => {
    if (err) {
      console.log("error in db retrieving repos: ", err);
    }
    callback(null, shoes);
  });
};

const findRelatedItems = (sku, callback) => {
  // retrieve specific entry
  //   get related items
  //   findAll entries and return that array of information
  const relatedShoes = [];
  CarouselItem.findOne({ sku: sku }).then(currentShoe => {
    console.log(currentShoe);
  });
};

// METHODS FOR SINGLE-ITEM
const findOne = (sku, callback) => {
  // CarouselItem.find({ sku: sku })
  //   .then(resultItem => {
  //     console.log(resultItem);
  //     callback(resultItem);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  CarouselItem.findOne({ sku: sku }, (err, item) => {
    if (err) {
      console.error(err);
      callback(err);
    }
    callback(null, item);
  });
};

const createOne = (shoeObj, callback) => {
  CarouselItem.create(shoeObj)
    .then(item => {
      callback(item);
    })
    .catch(err => {
      console.log(err);
    });
};

const updateOne = (sku, valuesToUpdate, callback) => {
  CarouselItem.findOneAndUpdate({ sku }, valuesToUpdate)
    .then(updatedItem => {
      callback(updatedItem);
    })
    .catch(err => {
      console.log(err);
    });
};

const deleteOne = (sku, callback) => {
  CarouselItem.findOneAndDelete({ sku })
    .then(deletedItem => {
      callback(deletedItem);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = {
  createOne,
  findOne,
  updateOne,
  deleteOne,
  findAll,
  findRelatedItems
};
