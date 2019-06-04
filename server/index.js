const express = require('express');
const bodyParser = require('body-parser');
const port = 3004;
const db = require('../database');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.static('public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enter routes below

app.get('/shoes', (req, res) => {
    db.findAll((err, shoes) => {
        if (err) {
            console.log('error returning shoes from db', err);
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
            console.log('success getting shoes from db');
            res.statusCode = 200;
            res.send(shoeArray);
        }
    })
})

getRandomShoe = (array) => {
    let randomIndex = Math.floor(Math.random() * array.length);
    return randomIndex;
}



app.listen(port, function () {
    console.log(`listening on port ${port}`);
});