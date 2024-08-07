import mongoose, { ConnectOptions } from 'mongoose'

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN_STRING as string, {} as ConnectOptions)

    console.log('Database online');

  } catch (error) {
    console.log(error);
    throw new Error('Error to connect to database');
  }
}
