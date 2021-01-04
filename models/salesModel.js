const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");

const salesSchema = new mongoose.Schema({
    date: {
        type: Date,
        index: true,
        maxlength: [255, errorMessage.GENERAL.maxlength],
        trim: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: "users"
    },
    product_id: {
        type: mongoose.Schema.ObjectId,
        ref: "products"
    },
    price: {
        type: Number,
        min: [1, errorMessage.GENERAL.minlength]
    },
    product_name:{
        type: mongoose.Schema.ObjectId, //Id del documento. Relación a otra colección
        ref: "products"//Contra que colección se relaciona
    },
    quantity: {
        type: Number
    }
});


module.exports = mongoose.model("sales", salesSchema);
