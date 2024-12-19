const adminAuth = (req,res,next)=>{
    const token = "xyzkjkjk";
    const isAdmin = token === 'xyz';
    if(!isAdmin){
        res.status(401).send("User is not Authorized !");
    } else {
        next();
    }
}

const userAuth = (req,res,next)=>{
    const token = "xyz";
    const isUser = token === 'xyz';
    if(!isUser){
        res.status(401).send("User is not Authorized !");
    } else {
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}