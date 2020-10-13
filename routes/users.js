var express = require('express');
var router = express.Router();
const usersAdminController = require("../controllers/usersAdminController");

router.post("/register", usersAdminController.create);
router.post("/login", usersAdminController.validate);


module.exports = router;
