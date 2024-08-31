import { Request, Response } from 'express';
import { ImageService } from '../services/image.service';

export class ImageController {
    private imageService: ImageService;

    constructor(imageService: ImageService) {
        this.imageService = imageService;
    }

    public getImagesByBreedId = async (req: Request, res: Response): Promise<void> => {
        const { breed_id } = req.params;
        try {
            const images = await this.imageService.getImagesByBreedId(breed_id);
            res.status(200).json(images);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener imágenes para la raza especificada.' });
        }
    };
}
