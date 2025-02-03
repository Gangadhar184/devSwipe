export const adminAuth = (req,res,next)=>{
    console.log("admin auth is getting checked")
    const token = "abc";
    const isAdminAuthorized = token === "abc";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
}
