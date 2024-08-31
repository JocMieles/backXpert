import express from 'express';
import breedRoutes from './routes/breeds.route';
import imageRoutes from './routes/image.route';
import userRoutes from './routes/user.route';
import { connectDB } from './config/database.config';
import { authenticateJWT } from './middleware/auth.middleware';
const cors = require('cors');

const app = express();

// Conectar a la base de datos
connectDB();

app.use(cors());

// Middlewares
app.use(express.json());

// Rutas (sin protección)
app.use('/api/users', userRoutes);

// Rutas protegidas (aplicar el middleware)
app.use('/api/breeds', authenticateJWT, breedRoutes);
app.use('/api/imagesbybreedid', authenticateJWT, imageRoutes);

export default app;
