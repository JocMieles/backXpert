import { Router } from 'express';
import { BreedsController } from '../controllers/breeds.controller';
import { BreedsService } from '../services/breeds.service';
import { BreedsRepository } from '../repositories/breeds.respository';
import { GetAllBreedsUseCase } from '../use-cases/breeds/get-all-breeds.usecase';
import { GetBreedByIdUseCase } from '../use-cases/breeds/get-breed-by-id.usecase';
import { SearchBreedsUseCase } from '../use-cases/breeds/search-breeds.usecase';

const breedsRoutes = Router();
const breedsRepository = new BreedsRepository();
const getAllBreedsUseCase = new GetAllBreedsUseCase(breedsRepository);
const getBreedByIdUseCase = new GetBreedByIdUseCase(breedsRepository);
const searchBreedsUseCase = new SearchBreedsUseCase(breedsRepository);
const breedsService = new BreedsService(getAllBreedsUseCase, getBreedByIdUseCase, searchBreedsUseCase);
const breedsController = new BreedsController(breedsService);

breedsRoutes.get('/search', breedsController.searchBreeds);
breedsRoutes.get('/:breed_id', breedsController.getBreedById);
breedsRoutes.get('/', breedsController.getAllBreeds);

export default breedsRoutes;
