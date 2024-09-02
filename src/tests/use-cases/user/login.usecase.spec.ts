import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginUserUseCase } from '../../../use-cases/user/login.usecase';
import { IUserRepository } from '../../../interfaces/IUserRepository';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('LoginUserUseCase', () => {
    let loginUserUseCase: LoginUserUseCase;
    let userRepository: jest.Mocked<IUserRepository>;
    const jwtSecret = 'testSecret';

    beforeEach(() => {
        userRepository = {
            findByEmail: jest.fn(),
            createUser: jest.fn(),
        } as jest.Mocked<IUserRepository>;
        loginUserUseCase = new LoginUserUseCase(userRepository, jwtSecret);
    });

    it('debería retornar un token si las credenciales son correctas', async () => {
        const email = 'josemieles@ejemplo.com';
        const password = 'test123*';
        const hashedPassword = 'hashedPassword';
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDFkNGJkMTY1ZmE3ZmFlY2FlYzg0NSIsImVtYWlsIjoiam9zZW1pZWxlc0BlamVtcGxvLmNvbSIsImlhdCI6MTcyNTAzNjAwNSwiZXhwIjoxNzI1MDM5NjA1fQ.6BS5gn1R-JC35lMVY4O7HBk4kfOy9kItxuqh59ezYZ4';

        userRepository.findByEmail.mockResolvedValue({
            _id: '1',
            name: 'Test User',
            email,
            password: hashedPassword,
        });

        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
        (jwt.sign as jest.Mock).mockReturnValue(token);

        const result = await loginUserUseCase.execute(email, password);

        expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
        expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
        expect(jwt.sign).toHaveBeenCalledWith(
            { id: '1', email },
            jwtSecret,
            { expiresIn: '1h' }
        );
        expect(result).toStrictEqual({
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDFkNGJkMTY1ZmE3ZmFlY2FlYzg0NSIsImVtYWlsIjoiam9zZW1pZWxlc0BlamVtcGxvLmNvbSIsImlhdCI6MTcyNTAzNjAwNSwiZXhwIjoxNzI1MDM5NjA1fQ.6BS5gn1R-JC35lMVY4O7HBk4kfOy9kItxuqh59ezYZ4',
        user: {
            name: 'Test User',
            email: 'josemieles@ejemplo.com',
        }});
    });

    it('debería retornar null si las credenciales son incorrectas', async () => {
        const email = 'test@example.com';
        const password = 'wrongPassword';

        userRepository.findByEmail.mockResolvedValue({
            _id: '1',
            name: 'Test User',
            email,
            password: 'hashedPassword',
        });

        (bcrypt.compare as jest.Mock).mockResolvedValue(false);

        const result = await loginUserUseCase.execute(email, password);

        expect(result).toBeNull();
    });
});
