import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public register = async (req: Request, res: Response): Promise<void> => {
        const { name, email, password } = req.body;
    
        if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            res.status(400).json({ message: 'Nombre, email y contraseña son requeridos' });
            return;
        }
    
        try {
            const result = await this.userService.register(name, email, password);
            if (result) {
                res.status(201).json(result);
            } else {
                res.status(204).send(); // Retornar un 204 No Content si no hay resultado
            }
        } catch (error) {
            res.status(500).json({ error: 'Error en el proceso de registro.' });
        }
    };
    

    public login = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body; // Usar query params según la especificación, aunque no es lo ideal

        if (typeof email !== 'string' || typeof password !== 'string') {
            res.status(400).json({ message: 'Email y contraseña son requeridos' });
            return;
        }

        try {
            const token = await this.userService.login(email, password);
            if (token) {
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Credenciales incorrectas' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error en el proceso de login.' });
        }
    };
}
