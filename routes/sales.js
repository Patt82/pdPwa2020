var express = require('express');
var router = express.Router();
var salesController = require("../controllers/salesController");

router.post("/", salesController.create);

module.exports = router;