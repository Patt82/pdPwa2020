const mongoose = require("../bin/mongodb");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: String,
        unique: true, 
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
//.pre => Middleware de mongoose - Previo a save, corre el middleware
userSchema.pre("save", function(next){
    this.password = bcrypt.hashSync(this.password, 10); // pisa el password sin encriptar del objeto creado, con la encriptación de bcrypt.
    next();
}); 
module.exports = mongoose.model("usersAdmin", userSchema);