import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';
export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://josem:josem1234*@cluster0.fjy0v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Error al conectar a MongoDB', error);
        process.exit(1);
    }
};
