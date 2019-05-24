const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CountrySchema = new Schema({
    name: String
});

var Country = mongoose.model('Country', CountrySchema);

module.exports = Country;
