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
  currentSku: Number,
  relatedShoes: [
    {
      itemSku: Number,
      productName: String,
      category: String,
      price: String,
      image: String
    }
  ]
});

carouselSchema.index({ "currentSku": 1 });

let CarouselItem = mongoose.model("Carousel", carouselSchema, "carousels");

const findAll = (obj, callback) => {
  CarouselItem.find(obj, (err, shoes) => {
    if (err) {
      console.log("error in db retrieving repos: ", err);
    }
    callback(null, shoes);
  });
};

///////////////////////////////////////////////////////////////////////////////////
const findRelatedItems = (sku, callback) => {
  CarouselItem.findOne({ currentSku: sku })
    .then(currentShoe => {
      callback(null, currentShoe);
    })
    .catch(err => {
      console.error(err);
    });
};

const deleteRelatedItems = (sku, callback) => {
  CarouselItem.findOneAndDelete({ currentSku: sku })
    .then(deletedItem => {
      callback(null, deletedItem);
    })
    .catch(err => {
      console.log(err);
    });
};

const createOne = (shoeObj, callback) => {
  // get count
  let newSku = null;
  // CarouselItem.count({})
  //   .then(count => {
  //     newSku = count;
  //   })
  //   .then(() => {
  //     CarouselItem.create(shoeObj);
  //   });
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
  updateOne,
  deleteOne,
  findAll,
  findRelatedItems,
  deleteRelatedItems
};
