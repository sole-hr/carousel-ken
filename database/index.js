const mongoose = require('mongoose');
const dbinfo = require('./pw.js');
//const shoes = require('../../shoe-data-generator/shoeData.json');

mongoose.connect(`mongodb+srv://${dbinfo.user}:${dbinfo.pw}@davidguenther-pdt5c.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true });
// mongodb+srv://Dcguenther:<password>@davidguenther-pdt5c.mongodb.net/test?retryWrites=true

let carouselSchema = mongoose.Schema({
    productName: String,
    sku: String,
    category: String,
    colors: [String],
    price: Number,
    images: [String]
});

let Carousel = mongoose.model('Carousel', carouselSchema);

let save = (data) => {
    //console.log('inside of save: ', data[0])
    Carousel.insertMany(data, (err) => {
        if (err) {
            console.log('insertion error: ', err)
        }
        console.log('attempting to update')
        Carousel.update(data, { upsert: true })

    });
}

//save(shoes);

let findAll = (obj, callback) => {
    Carousel.find(obj, (err, shoes) => {
        if (err) {
            console.log('error in db retrieving repos: ', err);
        }
        callback(null, shoes);
    })
}

module.exports = { save, findAll };