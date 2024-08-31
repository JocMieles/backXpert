import { Router } from 'express';
import { ImageController } from '../controllers/image.controller';
import { ImageService } from '../services/image.service';
import { ImageRepository } from '../repositories/image.repository';
import { GetImagesByBreedUseCase } from '../use-cases/image/get-images-by-breeds.usecase';

const router = Router();
const imageRepository = new ImageRepository();
const getImagesByBreedUseCase = new GetImagesByBreedUseCase(imageRepository);
const imageService = new ImageService(getImagesByBreedUseCase);
const imageController = new ImageController(imageService);

router.get('/:breed_id', imageController.getImagesByBreedId);

export default router;
