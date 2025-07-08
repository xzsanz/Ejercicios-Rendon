const loggerMiddleware =(req,res,next)=>{
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
    next();
};
module.exports = loggerMiddleware;