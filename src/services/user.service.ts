
import { IUserRepository } from '../interfaces/IUserRepository';
import { LoginUserUseCase } from '../use-cases/user/login.usecase';
import { RegisterUserUseCase } from '../use-cases/user/register.usecase';
import jwt from 'jsonwebtoken';

export class UserService {
    private registerUserUseCase: RegisterUserUseCase;
    private loginUserUseCase: LoginUserUseCase;
    private jwtSecret: string;
    
    constructor(userRepository: IUserRepository, jwtSecret: string) {
        this.registerUserUseCase = new RegisterUserUseCase(userRepository);
        this.loginUserUseCase = new LoginUserUseCase(userRepository, jwtSecret);
        this.jwtSecret = jwtSecret;
    }

    public async register(name: string, email: string, password: string) {
        const user = await this.registerUserUseCase.execute(name, email, password);
        return {
            message: 'Usuario registrado con éxito',
            user: user,
        };
    }

    public async login(email: string, password: string) {
        return this.loginUserUseCase.execute(email, password);
    }
    
    public async verifyToken(token: string): Promise<any> {
        try {
            return jwt.verify(token, this.jwtSecret);
        } catch (error) {
            return null;
        }
    }
}
