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
    email: {
        type: String,
        unique: true,
        required: [true, errorMessage.GENERAL.campo_obligatorio],
        validate: {
            validator: async function (v) {
                const document = await this.model("usersWeb").findOne({ user: v });
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
                return validators.isGoodPassword(v);
            },
            message: errorMessage.USERSADMIN.wrongPassword
        }
    }
});

userSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.statics.validateUser = async function (email, password) {
    const userWeb = await this.model("usersWeb").findOne({ email: email });
    if (userWeb) {
        if (bcrypt.compareSync(password, userWeb.password)) {
            return { error: false, message: "User ok", userWeb: userWeb };
        } else {
            return { error: true, message: "Wrong password" };
        }
    } else {
        return { error: true, message: "Wrong user" };
    }
}

module.exports = mongoose.model("usersWeb", userSchema);