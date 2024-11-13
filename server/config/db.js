const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('Database before connection');
        await mongoose.connect('mongodb://localhost:27017/MONGODB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
