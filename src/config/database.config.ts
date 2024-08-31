import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://josem:josem1234*@cluster0.fjy0v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('MongoDB conectado');
    } catch (error) {
        console.error('Error al conectar a MongoDB', error);
        process.exit(1);
    }
};
