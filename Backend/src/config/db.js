const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected successfully 🚀');
  } catch (error) {
    console.error('MongoDB connection failed ❌', error);
    process.exit(1); // Stop the server if DB doesn't connect
  }
};

module.exports = connectDB;