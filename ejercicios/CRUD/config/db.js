const mongoose = require("mongoose");

const conectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conexion a mongoDb realizada");
    } catch (error) {
        console.error("Error en la conexion",error);
        process.exit(1);
        
    }
}
module.exports = conectDb;