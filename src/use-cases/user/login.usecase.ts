import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../../interfaces/IUserRepository';

export class LoginUserUseCase {
    private jwtSecret: string;

    constructor(private userRepository: IUserRepository, jwtSecret: string) {
        this.jwtSecret = jwtSecret;
    }

    public async execute(email: string, password: string): Promise<object | null> {
        const user = await this.userRepository.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id, email: user.email }, this.jwtSecret, {
                expiresIn: '1h',
            });
            return {token:token, user:{email: user.email, name: user.name}};
        }
        return null;
    }
}
