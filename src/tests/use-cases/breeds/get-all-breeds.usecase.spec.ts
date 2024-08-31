import { IBreedsRepository } from "../../../interfaces/IBreedsRepository";
import { GetAllBreedsUseCase } from "../../../use-cases/breeds/get-all-breeds.usecase";


describe('GetAllBreedsUseCase', () => {
    let getAllBreedsUseCase: GetAllBreedsUseCase;
    let breedRepository: jest.Mocked<IBreedsRepository>;

    beforeEach(() => {
        breedRepository = {
            getAllBreeds: jest.fn(),
            getBreedById: jest.fn(),
            searchBreeds: jest.fn(),
        } as jest.Mocked<IBreedsRepository>;
        getAllBreedsUseCase = new GetAllBreedsUseCase(breedRepository);
    });

    it('debería retornar todas las razas', async () => {
        const breeds = [{ id: '1', name: 'Breed 1' }, { id: '2', name: 'Breed 2' }];
        breedRepository.getAllBreeds.mockResolvedValue(breeds);

        const result = await getAllBreedsUseCase.execute();

        expect(breedRepository.getAllBreeds).toHaveBeenCalled();
        expect(result).toBe(breeds);
    });
});
