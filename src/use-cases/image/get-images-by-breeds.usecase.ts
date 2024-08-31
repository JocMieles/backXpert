import { IImageRepository } from "../../interfaces/IImageRepository";
import { Image } from "../../models/image.model";

export class GetImagesByBreedUseCase {
    private imageRepository: IImageRepository;

    constructor(imageRepository: IImageRepository) {
        this.imageRepository = imageRepository;
    }

    public async execute(breed_id: string): Promise<Image[]> {
        return this.imageRepository.getImagesByBreedId(breed_id);
    }
}
