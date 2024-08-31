import bcrypt from 'bcrypt';
import { IUserRepository } from '../../interfaces/IUserRepository';

export class RegisterUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    public async execute(name: string, email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userRepository.createUser(name, email, hashedPassword);
    }
}
