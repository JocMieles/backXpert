import { BreedsController } from '../../controllers/breeds.controller';
import { BreedsService } from '../../services/breeds.service';
import { Request, Response } from 'express';

describe('BreedsController', () => {
    let breedsController: BreedsController;
    let breedsService: jest.Mocked<BreedsService>;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        // Mock del BreedsService
        breedsService = {
            getAllBreeds: jest.fn(),
            getBreedById: jest.fn(),
            searchBreeds: jest.fn(),
        } as unknown as jest.Mocked<BreedsService>;

        // Crear instancia del controlador con el servicio mockeado
        breedsController = new BreedsController(breedsService);

        // Mock de Request y Response
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe('getAllBreeds', () => {
        it('debería devolver un status 200 con la lista de razas', async () => {
            const breeds = [{ id: '1', name: 'Breed1' }, { id: '2', name: 'Breed2' }];
            breedsService.getAllBreeds.mockResolvedValue(breeds);

            await breedsController.getAllBreeds(req as Request, res as Response);

            expect(breedsService.getAllBreeds).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(breeds);
        });

        it('debería devolver un status 500 si ocurre un error', async () => {
            breedsService.getAllBreeds.mockRejectedValue(new Error('Error en el servicio'));

            await breedsController.getAllBreeds(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener las razas de gatos.' });
        });
    });

    describe('getBreedById', () => {
        it('debería devolver un status 200 con la raza de gato específica', async () => {
            const breed = { id: '1', name: 'Breed1' };
            req.params = { breed_id: '1' };
            breedsService.getBreedById.mockResolvedValue(breed);

            await breedsController.getBreedById(req as Request, res as Response);

            expect(breedsService.getBreedById).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(breed);
        });

        it('debería devolver un status 404 si la raza de gato no se encuentra', async () => {
            req.params = { breed_id: '1' };
            breedsService.getBreedById.mockResolvedValue(null);

            await breedsController.getBreedById(req as Request, res as Response);

            expect(breedsService.getBreedById).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Raza de gato no encontrada.' });
        });

        it('debería devolver un status 500 si ocurre un error', async () => {
            req.params = { breed_id: '1' };
            breedsService.getBreedById.mockRejectedValue(new Error('Error en el servicio'));

            await breedsController.getBreedById(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener la raza de gato.' });
        });
    });

    describe('searchBreeds', () => {
        it('debería devolver un status 200 con las razas buscadas', async () => {
            const breeds = [{ id: '1', name: 'Breed1' }];
            req.query = { q: 'Breed1' };
            breedsService.searchBreeds.mockResolvedValue(breeds);

            await breedsController.searchBreeds(req as Request, res as Response);

            expect(breedsService.searchBreeds).toHaveBeenCalledWith(req.query);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(breeds);
        });

        it('debería devolver un status 500 si ocurre un error', async () => {
            req.query = { q: 'Breed1' };
            breedsService.searchBreeds.mockRejectedValue(new Error('Error en el servicio'));

            await breedsController.searchBreeds(req as Request, res as Response);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error al buscar las razas de gatos.' });
        });
    });
});
