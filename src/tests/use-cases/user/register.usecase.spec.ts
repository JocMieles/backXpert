import bcrypt from 'bcrypt';
import { RegisterUserUseCase } from '../../../use-cases/user/register.usecase';
import { IUserRepository } from '../../../interfaces/IUserRepository';

jest.mock('bcrypt');

describe('RegisterUserUseCase', () => {
    let registerUserUseCase: RegisterUserUseCase;
    let userRepository: jest.Mocked<IUserRepository>;

    beforeEach(() => {
        userRepository = {
            createUser: jest.fn(),
            findByEmail: jest.fn(),
        } as jest.Mocked<IUserRepository>;
        registerUserUseCase = new RegisterUserUseCase(userRepository);
    });

    it('debería registrar un usuario correctamente', async () => {
        const name = 'Test User';
        const email = 'test@example.com';
        const password = 'password123';
        const hashedPassword = 'hashedPassword';

        (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
        userRepository.createUser.mockResolvedValue({
            id: '1',
            name,
            email,
            password: hashedPassword,
        });

        const user = await registerUserUseCase.execute(name, email, password);

        expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
        expect(userRepository.createUser).toHaveBeenCalledWith(name, email, hashedPassword);
        expect(user).toEqual({
            id: '1',
            name,
            email,
            password: hashedPassword,
        });
    });
});
