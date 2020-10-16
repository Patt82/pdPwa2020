const mongoose = require("../bin/mongodb");
const bcrypt = require("bcrypt");
const errorMessage = require("../util/errorMessage");
const validators = require("../util/validators");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, errorMessage.GENERAL.campo_obligatorio],
        trim: true
    },
    user: {
        type: String,
        unique: true,
        required: [true, errorMessage.GENERAL.campo_obligatorio],
        validate: {
            validator: async function (v) {
                const document = await this.model("usersAdmin").findOne({ user: v });
                if (document) {
                    return false;
                }
                return true;
            },
            message: errorMessage.USERSADMIN.userExist
        },

    },

    password: {
        type: String,
        required: [true, errorMessage.GENERAL.campo_obligatorio],
        validate: {
            validator: async function (v) {
                return validators.isGoodPassword(v); // función declarada en utils para validar el password
            },
            message: errorMessage.USERSADMIN.wrongPassword
        }
    }
});
//.pre => Middleware de mongoose - Previo a save, corre el middleware
userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10); // pisa el password sin encriptar del objeto creado, con la encriptación de bcrypt.
    next();
});
module.exports = mongoose.model("usersAdmin", userSchema);