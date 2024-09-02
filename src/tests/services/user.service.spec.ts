import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../interfaces/IUserRepository';
import { UserService } from '../../services/user.service';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('UserService', () => {
    let userService: UserService;
    let userRepository: jest.Mocked<IUserRepository>;
    const jwtSecret = '3F6b446auRD8HZyxgPTa1TElEfMZpf7rLxr7pYV8vX0FbgeSmzU8WDDVhpbCooRH';

    beforeEach(() => {
        userRepository = {
            findByEmail: jest.fn(),
            createUser: jest.fn(),
        } as jest.Mocked<IUserRepository>;
        userService = new UserService(userRepository, jwtSecret);
    });

    it('should register a user', async () => {
        const user = { name: 'Joddhn Doe', email: 'johdddn@example.com', password: 'password123' };
        const hashedPassword = 'hashedPassword';
        
        userRepository.createUser.mockResolvedValue({ id: 1, ...user, password: hashedPassword });
        (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
    
        const result = await userService.register(user.name, user.email, user.password);
    
        expect(bcrypt.hash).toHaveBeenCalledWith(user.password, 10);
        expect(userRepository.createUser).toHaveBeenCalledWith(user.name, user.email, hashedPassword);
        
        // Asegúrate de que el resultado contiene al menos estas propiedades
        const expectedResponse = {
            message: 'Usuario registrado con éxito',
            user: {
                id: 1,
                name: 'Joddhn Doe',
                email: 'johdddn@example.com',
                password: 'hashedPassword'
            }
        };
        expect(result).toEqual(expectedResponse);
    });

    it('should login a user', async () => {
        const user = { _id: '1',  name: 'Joddhn Doe', email: 'johdddn@example.com', password: 'hashedPassword' };
        userRepository.findByEmail.mockResolvedValue(user);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (jwt.sign as jest.Mock).mockReturnValue('jwt-token');

        const result = await userService.login(user.email, 'password123');

        expect(userRepository.findByEmail).toHaveBeenCalledWith(user.email);
        expect(bcrypt.compare).toHaveBeenCalledWith('password123', user.password);
        expect(jwt.sign).toHaveBeenCalledWith({ id: user._id, email: user.email }, jwtSecret, { expiresIn: '1h' });
        expect(result).toStrictEqual({ token: 'jwt-token', user: { name: 'Joddhn Doe', email: 'johdddn@example.com' }});
    });

    it('should verify a valid token', async () => {
        const token = 'valid-token';
        const decoded = { id: '1', email: 'johdddn@example.com' };
        
        (jwt.verify as jest.Mock).mockReturnValue(decoded);
    
        const result = await userService.verifyToken(token);
    
        expect(jwt.verify).toHaveBeenCalledWith(token, jwtSecret);
        expect(result).toEqual(decoded);
    });
    
    it('should return null for an invalid token', async () => {
        const token = 'invalid-token';
        
        (jwt.verify as jest.Mock).mockImplementation(() => {
            throw new Error('Invalid token');
        });
    
        const result = await userService.verifyToken(token);
    
        expect(jwt.verify).toHaveBeenCalledWith(token, jwtSecret);
        expect(result).toBeNull();
    });
    
});
