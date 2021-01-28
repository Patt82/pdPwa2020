var express = require('express');
var router = express.Router();
var productsController = require("../controllers/productsController");

router.get('/', productsController.getAll);
router.get("/:id", productsController.getById);
router.post("/", productsController.create);
router.post("/upload", productsController.upload);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.delete)

module.exports = router;
