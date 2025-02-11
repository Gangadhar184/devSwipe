
const mongoose = require('mongoose');
const validator = require('validator');

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

const User = mongoose.model("User", userSchema);

module.exports = User;
