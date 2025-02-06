const validator = require('validator');


const validateSignUpData = (req)=>{
    const {firstName, lastName, email, password} = req.body;    
    if(!firstName || !lastName){
        throw new Error("Name is not valid, Required Both fields");
    }
    else if(firstName.length < 4 || firstName.length > 50){
        throw new Error("Minimum length should be 4characters");
    }
    else if(!validator.isEmail(email)){
        throw new Errro("Invalid Credentials");
    }
    else if(!validator.isStrongPassword(password))  {
        throw new Error("Invalid Credentials");
    }
}

module.exports = validateSignUpData;
