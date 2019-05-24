var express = require('express');
var router = express.Router();

const city = require("../controllers/city");

router
    .route("/")
    .get(city.get)
    .post(city.add);

router
    .route("/:id")
    .put(city.update)
    .get(city.getOne)
    .delete(city.deleteCity);

module.exports = router;
