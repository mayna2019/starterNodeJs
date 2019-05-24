var bodyParser = require('body-parser')
const express = require('express');
const mongoose = require('mongoose');

const countryRouter = require('./routes/country');

const PORT = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


mongoose.connect('mongodb://localhost/starternodejs', { useNewUrlParser: true }, () => {
    console.log(`[database] is connected!`);
});



app.use("/countries", countryRouter);


// =========== Cities CRUD  =========== 
app.get('/cities/:id', async function (req, res) {
    let cityId = req.params.id;
    try {
        let city = await City.findById(cityId).populate('country_id');
        return res.json(city);
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.get('/cities', async function (req, res) {
    try {
        let cities = await City.find({}).populate('country_id');
        return res.json(cities);
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.post('/cities', async function (req, res) {
    let { name, country } = req.body;

    try {
        let city = await City.create({
            name,
            country_id: country
        })
        return res.json(city);
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.put('/cities/:id', async function (req, res) {
    let cityId = req.params.id;
    let { name } = req.body;
    try {
        let city = await City.findById(cityId);
        city.name = name;
        await city.save((err, newCity) => {
            if (err) return res.status(500).json(err);
            return res.json({ "message": "City was successfully update" });
        })
    } catch (error) {
        return res.status(500).json(error);
    }
});

app.delete('/cities/:id', async function (req, res) {
    let { id } = req.params;
    try {
        await City.findByIdAndDelete(id);
        return res.json({ "message": "City was successfully delete" });
    } catch (error) {
        return res.status(500).json(error);
    }
});


app.get('/', function (req, res) {
    return res.status(200).json({ "message": "api is working" });
});

app.get('*', function (req, res) {
    return res.status(404).json({ "message": "not found" });
});

app.listen(PORT, function () {
    console.log(`[server] Server listening on port ${PORT} !`);
});
