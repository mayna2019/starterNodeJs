const City = require("./../models/city");


async function get(req, res) {
    try {
        let cities = await City.find({}).populate('country_id');
        return res.json(cities);
    } catch (error) {
        return res.status(500).json(error);
    }
}

async function add(req, res) {
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
}

async function update(req, res) {
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
}

async function getOne(req, res) {
    let cityId = req.params.id;
    try {
        let city = await City.findById(cityId).populate('country_id');
        return res.json(city);
    } catch (error) {
        return res.status(500).json(error);
    }
}

async function deleteCity(req, res) {
    let { id } = req.params;
    try {
        await City.findByIdAndDelete(id);
        return res.json({ "message": "City was successfully delete" });
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    get,
    add,
    update,
    getOne,
    deleteCity
};