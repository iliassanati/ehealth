import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://rdv-mongo-srv:27017/rdv', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
  }
};

export default connectDB;
