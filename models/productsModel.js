const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");

/**
 * tagsSchema -> schema para subdocumento Tags
 */  
const tagsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const imgSchema = new mongoose.Schema({
    fieldname: "String",
    originalname: "String",
    encoding: "String",
    mimetype: "String",
    destination: "String",
    filename: "String",
    path: "String",
    size: "String"
})

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        index: true,
        maxlength: [255, errorMessage.GENERAL.maxlength],
        trim: true,
        required: [true, errorMessage.GENERAL.campo_obligatorio]
    },
    sku: {
        type: String,
        unique: true,
        maxlength: [255, errorMessage.GENERAL.maxlength],
        trim: true,
        required: [true, errorMessage.GENERAL.campo_obligatorio]
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ["pendiente", "en_stock", "activo"]
    },
    category:{
        type: mongoose.Schema.ObjectId, //Id del documento. Relación a otra colección
        ref: "categories"//Contra que colección se relaciona
    },
    price: {
        type: Number,
        min: [1, errorMessage.GENERAL.minlength],
        required: [true, errorMessage.GENERAL.campo_obligatorio]
    },
    price_currency:{
        type:String
    },
    quantity: Number,
    tags: [tagsSchema], //Array porque puede tener multiples tags
    images: imgSchema 
});


//Método estático para validar que la categoría exista
productsSchema.statics.findByIdAndValidate = async function (id){
    const document = await this.findById(id);
    if(!document){
        res.json({error: true, message: "Product doesn't exist"});
    }
    return document;
}

// productsSchema.virtual("image_path").get(function () {
//     if(this.images && this.images.filename){
//         return "http://localhost:3000/public/images/" + this.images.filename;
//     }else{
//         return null;
//     }
    
// })
//Plugin aplica el plugin mongoosePaginate al productsSchema
productsSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model("products", productsSchema);