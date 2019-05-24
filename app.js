var bodyParser = require('body-parser')
const express = require('express');
const mongoose = require('mongoose');

const countryRouter = require('./routes/country');
const cityRouter = require('./routes/city');

const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


mongoose.connect('mongodb://localhost/starternodejs', { useNewUrlParser: true }, () => {
    console.log(`[database] is connected!`);
});

app.use("/countries", countryRouter);
app.use("/cities", cityRouter);

app.get('/', function (req, res) {
    return res.status(200).json({ "message": "api is working" });
});

app.get('*', function (req, res) {
    return res.status(404).json({ "message": "not found" });
});

app.listen(PORT, function () {
    console.log(`[server] Server listening on port ${PORT} !`);
});
