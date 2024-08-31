import { Request, Response } from 'express';
import { ImageController } from '../../controllers/image.controller';
import { ImageService } from '../../services/image.service';
import { Image } from "../../models/image.model";

describe('ImageController', () => {
    let imageController: ImageController;
    let imageService: jest.Mocked<ImageService>;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        imageService = {
            getImagesByBreedId: jest.fn(),
        } as unknown as jest.Mocked<ImageService>;

        imageController = new ImageController(imageService);

        req = {
            params: { breed_id: 'emau' },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should return images with status 200', async () => {
        const images: Image[] = [
            new Image('image1', 'http://image-url.com/1', 'emau'),
        ];

        imageService.getImagesByBreedId.mockResolvedValue(images);

        await imageController.getImagesByBreedId(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(images);
    });

    it('should return status 500 if there is an error', async () => {
        imageService.getImagesByBreedId.mockRejectedValue(new Error('Error'));

        await imageController.getImagesByBreedId(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener imágenes para la raza especificada.' });
    });
});
