import { BreedsService } from '../../services/breeds.service';
import { GetAllBreedsUseCase } from '../../use-cases/breeds/get-all-breeds.usecase';
import { GetBreedByIdUseCase } from '../../use-cases/breeds/get-breed-by-id.usecase';
import { SearchBreedsUseCase } from '../../use-cases/breeds/search-breeds.usecase';

describe('BreedsService', () => {
    let breedsService: BreedsService;
    let getAllBreedsUseCase: jest.Mocked<GetAllBreedsUseCase>;
    let getBreedByIdUseCase: jest.Mocked<GetBreedByIdUseCase>;
    let searchBreedsUseCase: jest.Mocked<SearchBreedsUseCase>;

    beforeEach(() => {
        getAllBreedsUseCase = {
            execute: jest.fn(),
        } as unknown as jest.Mocked<GetAllBreedsUseCase>;

        getBreedByIdUseCase = {
            execute: jest.fn(),
        } as unknown as jest.Mocked<GetBreedByIdUseCase>;

        searchBreedsUseCase = {
            execute: jest.fn(),
        } as unknown as jest.Mocked<SearchBreedsUseCase>;

        breedsService = new BreedsService(
            getAllBreedsUseCase,
            getBreedByIdUseCase,
            searchBreedsUseCase
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllBreeds', () => {
        it('debería devolver todas las razas de gatos', async () => {
            const breedsData = [
                { id: '1', name: 'Breed1' },
                { id: '2', name: 'Breed2' },
            ];

            getAllBreedsUseCase.execute.mockResolvedValueOnce(breedsData);

            const result = await breedsService.getAllBreeds();

            expect(getAllBreedsUseCase.execute).toHaveBeenCalled();
            expect(result).toEqual(breedsData);
        });

        it('debería manejar errores en getAllBreeds', async () => {
            getAllBreedsUseCase.execute.mockRejectedValueOnce(new Error('Error fetching breeds'));

            await expect(breedsService.getAllBreeds()).rejects.toThrow('Error fetching breeds');
        });
    });

    describe('getBreedById', () => {
        it('debería devolver una raza específica por ID', async () => {
            const breedData = { id: '1', name: 'Breed1' };

            getBreedByIdUseCase.execute.mockResolvedValueOnce(breedData);

            const result = await breedsService.getBreedById('1');

            expect(getBreedByIdUseCase.execute).toHaveBeenCalledWith('1');
            expect(result).toEqual(breedData);
        });

        it('debería manejar errores en getBreedById', async () => {
            getBreedByIdUseCase.execute.mockRejectedValueOnce(new Error('Error fetching breed by ID'));

            await expect(breedsService.getBreedById('1')).rejects.toThrow('Error fetching breed by ID');
        });
    });

    describe('searchBreeds', () => {
        it('debería devolver una lista de razas basada en la búsqueda', async () => {
            const query = { name: 'Breed1' };
            const breedsData = [
                { id: '1', name: 'Breed1' },
            ];

            searchBreedsUseCase.execute.mockResolvedValueOnce(breedsData);

            const result = await breedsService.searchBreeds(query);

            expect(searchBreedsUseCase.execute).toHaveBeenCalledWith(query);
            expect(result).toEqual(breedsData);
        });

        it('debería manejar errores en searchBreeds', async () => {
            searchBreedsUseCase.execute.mockRejectedValueOnce(new Error('Error searching breeds'));

            await expect(breedsService.searchBreeds({ name: 'Breed1' })).rejects.toThrow('Error searching breeds');
        });
    });
});
