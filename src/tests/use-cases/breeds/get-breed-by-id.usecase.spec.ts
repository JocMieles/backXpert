
import { IBreedsRepository } from '../../../interfaces/IBreedsRepository';
import { GetBreedByIdUseCase } from '../../../use-cases/breeds/get-breed-by-id.usecase';

describe('GetBreedByIdUseCase', () => {
    let getBreedByIdUseCase: GetBreedByIdUseCase;
    let breedRepository: jest.Mocked<IBreedsRepository>;

    beforeEach(() => {
        breedRepository = {
            getAllBreeds: jest.fn(),
            getBreedById: jest.fn(),
            searchBreeds: jest.fn(),
        } as jest.Mocked<IBreedsRepository>;
        getBreedByIdUseCase = new GetBreedByIdUseCase(breedRepository);
    });

    it('debería retornar una raza específica por ID', async () => {
        const breed = { id: '1', name: 'Breed 1' };
        breedRepository.getBreedById.mockResolvedValue(breed);

        const result = await getBreedByIdUseCase.execute('1');

        expect(breedRepository.getBreedById).toHaveBeenCalledWith('1');
        expect(result).toBe(breed);
    });
});
