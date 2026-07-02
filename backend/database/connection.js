const mongoose = require('mongoose');

const connectDatabase = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.log('MONGO_URI not found. Using local JSON storage instead of MongoDB.');
    return false;
  }

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('Connected to MongoDB');
  return true;
};

module.exports = connectDatabase;
