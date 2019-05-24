var express = require('express');
var router = express.Router();

const country = require("./../controllers/country");

router
    .route("/")
    .get(country.get)
    .post(country.add);

router
    .route("/:id")
    .put(country.update)
    .get(country.getOne)
    .delete(country.deleteCountry);

module.exports = router;
