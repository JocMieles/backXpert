import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';
import dotenv from 'dotenv';

// Cargar las variables de entorno (opcional si ya lo haces en server.ts)
dotenv.config();

const userRoutes = Router();

// Instanciar el repositorio
const userRepository = new UserRepository();

// Obtener el JWT Secret desde las variables de entorno
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    throw new Error('JWT_SECRET no está definido en las variables de entorno.');
}

// Instanciar el servicio con las dependencias requeridas
const userService = new UserService(userRepository, jwtSecret);

// Instanciar el controlador con el servicio
const userController = new UserController(userService);

// Definir las rutas
userRoutes.post('/register', (req, res) => userController.register(req, res));
userRoutes.post('/login', (req, res) => userController.login(req, res));

export default userRoutes;
