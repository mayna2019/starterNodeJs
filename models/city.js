const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CitySchema = new Schema({
    name: String,
    country_id: {
        type: ObjectId,
        required: true,
        ref: 'Country'
    }
});

var City = mongoose.model('City', CitySchema);

module.exports = City;
