import { Request, Response } from 'express';
import { BreedsService } from '../services/breeds.service';

export class BreedsController {
    private breedsService: BreedsService;

    constructor(breedsService: BreedsService) {
        this.breedsService = breedsService;
    }

    public getAllBreeds = async (req: Request, res: Response): Promise<void> => {
        try {
            const breeds = await this.breedsService.getAllBreeds();
            res.status(200).json(breeds);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener las razas de gatos.' });
        }
    };

    public getBreedById = async (req: Request, res: Response): Promise<void> => {
        const { breed_id } = req.params;
        try {
            const breed = await this.breedsService.getBreedById(breed_id);
            if (!breed) {
                res.status(404).json({ error: 'Raza de gato no encontrada.' });
            } else {
                res.status(200).json(breed);
            }
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener la raza de gato.' });
        }
    };

    public searchBreeds = async (req: Request, res: Response): Promise<void> => {
        const query = req.query;
        try {
            const breeds = await this.breedsService.searchBreeds(query);
            res.status(200).json(breeds);
        } catch (error) {
            res.status(500).json({ error: 'Error al buscar las razas de gatos.' });
        }
    };
}
