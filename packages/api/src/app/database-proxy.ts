/* eslint-disable no-console */
import mongoose from 'mongoose';

export class DatabaseProxy {
  private generateConnectionString() {
    const {
      MONGO_USERNAME,
      MONGO_PASSWORD,
      MONGO_DATABASE,
      MONGO_URL,
      MONGO_PORT,
    } = process.env;

    return (
      `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}:${MONGO_PORT}/${MONGO_DATABASE}` +
      `?retryWrites=true&w=majority`
    );
  }

  connect() {
    mongoose
      .connect(this.generateConnectionString(), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Connected to database.');
      })
      .catch(() => {
        console.error('Error connecting to database.');
      });
  }
}
