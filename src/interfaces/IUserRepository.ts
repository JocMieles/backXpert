export interface IUserRepository {
    createUser(name: string, email: string, hashedPassword: string): Promise<any>;
    findByEmail(email: string): Promise<any>;
}
