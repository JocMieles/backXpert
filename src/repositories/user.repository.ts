import { IUserRepository } from '../interfaces/IUserRepository';
import { UserModel, IUser } from '../models/user.model';

export class UserRepository implements IUserRepository {
    public async createUser(name: string, email: string, hashedPassword: string): Promise<IUser> {
        const user = new UserModel({
            name,
            email,
            password: hashedPassword,
        });
        return user.save();
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        return UserModel.findOne({ email });
    }
}
