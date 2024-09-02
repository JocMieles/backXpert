import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { UserRepository } from '../repositories/user.repository';

const jwtSecret = process.env.JWT_SECRET || 'defaultSecretKey';
const userService = new UserService(new UserRepository(), jwtSecret);

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('Authorization');
    
    if (authHeader) {
        const token = authHeader;  // Asegúrate de que el token esté en el formato correcto
        
        if (token) {
            try {
                const user = await userService.verifyToken(token);
                if (user) {
                    req.user = user;  // Asigna el usuario a req.user
                    return next();     // Continúa con la siguiente función
                }
            } catch (error) {
                console.error('Error verificando el token:', error);
            }
        }
    }
    res.status(403).json({ message: 'Acceso denegado' });
};
