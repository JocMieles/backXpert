import dotenv from 'dotenv';
import axios from 'axios';
import { IImageRepository } from '../interfaces/IImageRepository';
import { Image } from '../models/image.model';

dotenv.config();

export class ImageRepository implements IImageRepository {
    private apiBaseUrl = process.env.API_BASE_URL!;
    private apiKey = process.env.API_KEY!;

    public async getImagesByBreedId(breed_id: string): Promise<Image[]> {
        const response = await axios.get(`${this.apiBaseUrl}/images/search`, {
            params: { breed_id, limit: 100 }
        });

        return response.data.map((data: any) => new Image(
            data.id,
            data.url,
            breed_id
        ));
    }
}
