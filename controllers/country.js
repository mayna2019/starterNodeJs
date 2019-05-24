const Country = require("./../models/country");


async function get(req, res) {
    try {
        let countries = await Country.find({})
        return res.json(countries);
    } catch (error) {
        return res.status(500).json(error);
    }
}

async function add(req, res) {
    let countryName = req.body.name;
    try {
        await Country.create({
            name: countryName
        })
        return res.json({ "message": "Country was successfully create !" });
    } catch (error) {
        return res.status(500).json(error);
    }
}

async function update(req, res) {
    let countryId = req.params.id;
    let { name } = req.body;
    try {
        let country = await Country.findById(countryId);
        country.name = name;
        await country.save((err, newCountry) => {
            if (err) return res.status(500).json(err);
            return res.json({ "message": "country was successfully update" });
        })
    } catch (error) {
        return res.status(500).json(error);
    }
}

async function getOne(req, res) {
    let countryId = req.params.id;
    try {
        let country = await Country.findById(countryId);
        return res.json(country);
    } catch (error) {
        return res.status(500).json(error);
    }
}

async function deleteCountry(req, res) {
    let { id } = req.params;
    try {
        await Country.findByIdAndDelete(id);
        return res.json({ "message": "country was successfully delete" });
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    get,
    add,
    update,
    getOne,
    deleteCountry
};