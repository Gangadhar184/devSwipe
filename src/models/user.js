
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        maxLength : 50
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true,
        trim : true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address: " + value) ;
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Use strong password: " + value);
            }
        }

    },
    age : {
        type : Number,
        required : true,
        min : 16
    },
    gender : {
        type : String,
        required : true,
        validate(value) {
            if (!['male', 'female'].includes(value)){
                throw new Error ("Gender data is not valid")
            }
        }
    },
    photoUrl : {
        type : String,
        default : "https://www.w3schools.com/howto/howto_css_image_avatar.asp",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo url: " + value);
            }
        }
    },
    about : {
        type : String,
        default : " This a default about of the User "
    },
    skills : {
        type : [String]
        
    }
}, {
    timestamps: true
});

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({_id : user._id }, "onepiece@123", {expiresIn: "1d"});

    return token;
}

userSchema.methods.validatePassword = async function (passwordByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = bcrypt.compare(passwordByUser,passwordHash);
    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
