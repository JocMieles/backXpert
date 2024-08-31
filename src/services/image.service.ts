import { GetImagesByBreedUseCase } from "../use-cases/image/get-images-by-breeds.usecase";

export class ImageService {
    private getImagesByBreedUseCase: GetImagesByBreedUseCase;

    constructor(getImagesByBreedUseCase: GetImagesByBreedUseCase) {
        this.getImagesByBreedUseCase = getImagesByBreedUseCase;
    }

    public async getImagesByBreedId(breed_id: string) {
        return this.getImagesByBreedUseCase.execute(breed_id);
    }
}
