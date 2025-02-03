 const adminAuth = (req,res,next)=>{
    console.log("admin auth is getting checked")
    const token = "abc";
    const isAdminAuthorized = token === "abc";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
}
const userAuth = (req,res,next)=>{
    console.log("user auth is getting checked")
    const token = "abc";
    const isAdminAuthorized = token === "abc";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
}
module.exports = {
    adminAuth, userAuth
}
