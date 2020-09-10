import mongoose from 'mongoose';
import { mongoURI } from '../keys';
import { app } from './app';

const start = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('auth service listening on port 3000!')
  });
};

start();