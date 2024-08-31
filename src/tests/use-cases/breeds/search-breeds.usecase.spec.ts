
import { IBreedsRepository } from '../../../interfaces/IBreedsRepository';
import { SearchBreedsUseCase } from '../../../use-cases/breeds/search-breeds.usecase';

describe('SearchBreedsUseCase', () => {
    let searchBreedsUseCase: SearchBreedsUseCase;
    let breedRepository: jest.Mocked<IBreedsRepository>;

    beforeEach(() => {
        breedRepository = {
            getAllBreeds: jest.fn(),
            getBreedById: jest.fn(),
            searchBreeds: jest.fn(),
        } as jest.Mocked<IBreedsRepository>;
        searchBreedsUseCase = new SearchBreedsUseCase(breedRepository);
    });

    it('debería retornar razas basadas en una consulta', async () => {
        const breeds = [{ id: '1', name: 'Breed 1' }];
        breedRepository.searchBreeds.mockResolvedValue(breeds);

        const result = await searchBreedsUseCase.execute(breeds);

        expect(breedRepository.searchBreeds).toHaveBeenCalledWith(breeds);
        expect(result).toBe(breeds);
    });
});
