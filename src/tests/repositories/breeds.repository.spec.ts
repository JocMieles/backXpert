import axios from 'axios';
import { Breed } from '../../models/breeds.model';
import { BreedsRepository } from '../../repositories/breeds.respository';

// Mockear axios para evitar llamadas reales a la API
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BreedsRepository', () => {
    let breedsRepository: BreedsRepository;

    beforeEach(() => {
        breedsRepository = new BreedsRepository();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllBreeds', () => {
        it('debería devolver una lista de razas de gatos', async () => {
            const breedsData = [
                {
                    id: '1',
                    name: 'Breed1',
                    origin: 'Country1',
                    description: 'Description1',
                    temperament: 'Temperament1',
                    life_span: '12-15 years',
                },
                {
                    id: '2',
                    name: 'Breed2',
                    origin: 'Country2',
                    description: 'Description2',
                    temperament: 'Temperament2',
                    life_span: '10-12 years',
                },
            ];

            mockedAxios.get.mockResolvedValueOnce({ data: breedsData });

            const result = await breedsRepository.getAllBreeds();

            expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/breeds`, {

            });
            expect(result).toEqual(breedsData.map(breed => new Breed(
                breed.id,
                breed.name,
                breed.origin,
                breed.description,
                breed.temperament,
                breed.life_span
            )));
        });

        it('debería manejar un error cuando la API falla', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

            await expect(breedsRepository.getAllBreeds()).rejects.toThrow('API Error');
        });
    });

    describe('getBreedById', () => {
        it('debería devolver una raza de gato específica por ID', async () => {
            const breedData = {
                id: '1',
                name: 'Breed1',
                origin: 'Country1',
                description: 'Description1',
                temperament: 'Temperament1',
                life_span: '12-15 years',
            };

            mockedAxios.get.mockResolvedValueOnce({ data: breedData });

            const result = await breedsRepository.getBreedById('1');

            expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/breeds/1`, {
            });
            expect(result).toEqual(new Breed(
                breedData.id,
                breedData.name,
                breedData.origin,
                breedData.description,
                breedData.temperament,
                breedData.life_span
            ));
        });

        it('debería manejar un error cuando la API falla', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

            await expect(breedsRepository.getBreedById('1')).rejects.toThrow('API Error');
        });
    });

    describe('searchBreeds', () => {
        it('debería devolver una lista de razas de gatos basadas en la consulta', async () => {
            const query = { name: 'Breed1' };
            const breedsData = [
                {
                    id: '1',
                    name: 'Breed1',
                    origin: 'Country1',
                    description: 'Description1',
                    temperament: 'Temperament1',
                    life_span: '12-15 years',
                },
            ];

            mockedAxios.get.mockResolvedValueOnce({ data: breedsData });

            const result = await breedsRepository.searchBreeds(query);

            const queryString = new URLSearchParams(query as any).toString();

            expect(mockedAxios.get).toHaveBeenCalledWith(`${process.env.API_BASE_URL}/breeds/search?${queryString}`, {
            });
            expect(result).toEqual(breedsData.map(breed => new Breed(
                breed.id,
                breed.name,
                breed.origin,
                breed.description,
                breed.temperament,
                breed.life_span
            )));
        });

        it('debería manejar un error cuando la API falla', async () => {
            const query = { name: 'Breed1' };
            mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

            await expect(breedsRepository.searchBreeds(query)).rejects.toThrow('API Error');
        });
    });
});
