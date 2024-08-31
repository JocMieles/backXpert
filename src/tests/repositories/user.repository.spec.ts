
import { UserModel } from '../../models/user.model';
import { UserRepository } from '../../repositories/user.repository';

jest.mock('../../models/user.model'); // Mockeamos el modelo de Mongoose

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    jest.clearAllMocks(); // Limpiar los mocks antes de cada prueba
  });

  describe('createUser', () => {
    it('debería crear y guardar un nuevo usuario', async () => {
      const saveMock = jest.fn().mockResolvedValue(true);
      const UserModelMock = jest.spyOn(UserModel.prototype, 'save').mockImplementation(saveMock);

      const result = await userRepository.createUser('John Doe', 'john@example.com', 'hashedPassword');

      expect(UserModel).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
      });
      expect(saveMock).toHaveBeenCalled();
      expect(result).toBe(true);

      UserModelMock.mockRestore(); // Restaurar la implementación original
    });
  });

  describe('findByEmail', () => {
    it('debería encontrar un usuario por correo electrónico', async () => {
      const mockUser = {
        _id: 'someUserId',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedPassword',
      };
      const findOneMock = jest.spyOn(UserModel, 'findOne').mockResolvedValue(mockUser);

      const result = await userRepository.findByEmail('john@example.com');

      expect(findOneMock).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(result).toEqual(mockUser);

      findOneMock.mockRestore(); // Restaurar la implementación original
    });

    it('debería retornar null si no encuentra un usuario', async () => {
      const findOneMock = jest.spyOn(UserModel, 'findOne').mockResolvedValue(null);

      const result = await userRepository.findByEmail('nonexistent@example.com');

      expect(findOneMock).toHaveBeenCalledWith({ email: 'nonexistent@example.com' });
      expect(result).toBeNull();

      findOneMock.mockRestore(); // Restaurar la implementación original
    });
  });
});
