const mongoose = require("mongoose");
// const dbinfo = require('./pw.js');

//const shoes = require('../../shoe-data-generator/shoeData.json');

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${
    process.env.DB_PW
  }@davidguenther-pdt5c.mongodb.net/test?retryWrites=true`,
  { useNewUrlParser: true }
);

let carouselSchema = mongoose.Schema({
  productName: String,
  sku: String,
  category: String,
  colors: [String],
  price: Number,
  images: [String]
});

let CarouselItem = mongoose.model("Carousel", carouselSchema);

let save = data => {
  CarouselItem.insertMany(data, err => {
    if (err) {
      console.log("insertion error: ", err);
    }
    console.log("attempting to update");
    CarouselITem.update(data, { upsert: true });
  });
};

//save(shoes);

let findAll = (obj, callback) => {
  CarouselItem.find(obj, (err, shoes) => {
    if (err) {
      console.log("error in db retrieving repos: ", err);
    }
    callback(null, shoes);
  });
};

let findOne = (conditions, callback) => {
  CarouselItem.findOne(conditions)
    .then(resultItem => {
      callback(resultItem);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = { save, findOne, findAll };
