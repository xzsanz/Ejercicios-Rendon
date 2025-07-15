const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Conexión a MongoDB realizada');
    } catch (error) {
        console.error('Error en la conexión', error);
        process.exit(1);
    }
};

module.exports = connectDb;
