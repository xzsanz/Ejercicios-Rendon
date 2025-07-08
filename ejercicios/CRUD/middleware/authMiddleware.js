const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader|| !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message:"Token requerido"});
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decoded;
            next();
    } catch (error) {
        res.status(401).json({message : "Token invalido"});
    }


};
module.exports = authMiddleware;