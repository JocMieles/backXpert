import { UserController } from '../../controllers/user.controller';
import { UserService } from '../../services/user.service';
import { IUserRepository } from '../../interfaces/IUserRepository';

describe('UserController', () => {
    let userController: UserController;
    let userService: UserService;
    let userRepository: jest.Mocked<IUserRepository>;
    const jwtSecret = '3F6b446auRD8HZyxgPTa1TElEfMZpf7rLxr7pYV8vX0FbgeSmzU8WDDVhpbCooRH';

    beforeEach(() => {
        userRepository = {
            findByEmail: jest.fn(),
            createUser: jest.fn(),
        } as jest.Mocked<IUserRepository>;
        
        userService = new UserService(userRepository, jwtSecret); // Proporcionando ambos argumentos
        userController = new UserController(userService);
    });

    afterEach(() => {
        jest.clearAllMocks(); // Limpia todos los mocks después de cada prueba
        jest.resetModules(); // Resetea los módulos importados
        // Puedes añadir aquí cualquier otro tipo de limpieza que necesites
    });

    it('debería manejar un error al registrar un usuario', async () => {
        const req = { body: { name: '', email: '', password: '' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        const error = {message: 'Error en el proceso de registro.'};
        userService.register = jest.fn().mockRejectedValue(error);
    
        await userController.register(req as any, res as any);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
    
    it('debería manejar un error al iniciar sesión', async () => {
        const req = { body: { email: 'johdddn@example.com', password: 'wrongpassword' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        const error = {message: 'Error en el proceso de login.'};
        userService.login = jest.fn().mockRejectedValue(error);
    
        await userController.login(req as any, res as any);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });

    it('debería retornar 400 si falta el correo electrónico en el login', async () => {
        const req = { body: { password: 'password123' } }; // No hay correo electrónico
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        await userController.login(req as any, res as any);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email y contraseña son requeridos' });
    });
    
    it('debería retornar 400 si name, email o password no son strings', async () => {
        const req = { body: { name: 123, email: {}, password: [] } }; // Tipos incorrectos
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        await userController.register(req as any, res as any);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Nombre, email y contraseña son requeridos' });
    });
    
    it('debería retornar 400 si email o password no son strings', async () => {
        const req = { body: { email: 123, password: {} } }; // Tipos incorrectos
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        await userController.login(req as any, res as any);
    
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email y contraseña son requeridos' });
    });
    
    it('debería manejar correctamente un caso en el que register no retorne nada', async () => {
        const req = { body: { name: 'John Doe', email: 'john@example.com', password: 'password123' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn()  // Añadir mock para send
        };
    
        // Simular que el servicio no retorna nada
        userService.register = jest.fn().mockResolvedValue(undefined);
    
        await userController.register(req as any, res as any);
    
        // Aquí verificamos que se llama a res.status con 204 y que no se llama a res.json
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).not.toHaveBeenCalled(); // No debería enviar ninguna respuesta JSON
        expect(res.send).toHaveBeenCalled(); // Verificar que se llama a send para cerrar la respuesta
    });
    
    
    it('debería retornar 201 con el resultado cuando register es exitoso', async () => {
        const req = { body: { name: 'John Doe', email: 'john@example.com', password: 'password123' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        const mockResult = { id: '1', name: 'John Doe', email: 'john@example.com' };
    
        // Simulamos que el servicio retorna un resultado válido
        userService.register = jest.fn().mockResolvedValue(mockResult);
    
        await userController.register(req as any, res as any);
    
        expect(res.status).toHaveBeenCalledWith(201);  // Verificamos que el estado es 201
        expect(res.json).toHaveBeenCalledWith(mockResult);  // Verificamos que el resultado se envía como JSON
    });
    

    it('debería retornar 401 si las credenciales son incorrectas y no se genera un token', async () => {
        const req = { body: { email: 'johdddn@example.com', password: 'wrongpassword' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        // Simular que el servicio de login retorna null (credenciales incorrectas)
        userService.login = jest.fn().mockResolvedValue(null);
    
        await userController.login(req as any, res as any);
    
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Credenciales incorrectas' });
    });

    it('debería retornar 200 con un token válido', async () => {
        const req = { body: { email: 'johdddn@example.com', password: 'password123' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    
        const mockToken = 'valid-jwt-token';
        userService.login = jest.fn().mockResolvedValue({token: 'valid-jwt-token', user: { name: 'John Doe', email: 'johdddn@example.com'}});
    
        await userController.login(req as any, res as any);
    
        expect(res.status).toHaveBeenCalledWith(200);  // Asegurarse de que se llama con 200
        expect(res.json).toHaveBeenCalledWith({ token: 'valid-jwt-token',user: { name: 'John Doe', email: 'johdddn@example.com'} });  // Verificar que el token se pasa correctamente
    });
    
    
    
});
