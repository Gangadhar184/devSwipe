const adminAuth = (req,res)=>{
    console.log("admin auth is getting checked");
    const token = 'abc';
    const isAdminAuthorized  = token === 'abc';
    if(!isAdminAuthorized){
        res.status(401).send("unauthorizzed request");
       
    }
    else{
        next();
    }
}

const userAuth = (req,res)=>{
    console.log("checking user auth");
    const token = 'aldf';
    const isUserAuthorized = token === 'asdfaa';
    if(!isUserAuthorized){
        res.status(401).send("unauthorized request");
    }
    else{
        next();
    }
}
module.exports = {
    adminAuth, userAuth
}

