import { IUser } from './path/to/your/user.model';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}