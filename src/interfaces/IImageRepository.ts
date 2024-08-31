import { Image } from '../models/image.model';

export interface IImageRepository {
    getImagesByBreedId(breed_id: string): Promise<Image[]>;
}
