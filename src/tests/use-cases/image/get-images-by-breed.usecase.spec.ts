import { GetImagesByBreedUseCase } from '../../../use-cases/image/get-images-by-breeds.usecase';
import { IImageRepository } from '../../../interfaces/IImageRepository';
import { Image } from '../../../models/image.model';

describe('GetImagesByBreedUseCase', () => {
    let getImagesByBreedUseCase: GetImagesByBreedUseCase;
    let imageRepository: jest.Mocked<IImageRepository>;

    beforeEach(() => {
        imageRepository = {
            getImagesByBreedId: jest.fn(),
        } as unknown as jest.Mocked<IImageRepository>;

        getImagesByBreedUseCase = new GetImagesByBreedUseCase(imageRepository);
    });

    it('should return images for a given breed id', async () => {
        const breed_id = 'emau';
        const images: Image[] = [
            new Image('1', 'http://image-url.com/1', breed_id),
            new Image('2', 'http://image-url.com/2', breed_id),
        ];

        imageRepository.getImagesByBreedId.mockResolvedValue(images);

        const result = await getImagesByBreedUseCase.execute(breed_id);

        expect(result).toEqual(images);
        expect(imageRepository.getImagesByBreedId).toHaveBeenCalledWith(breed_id);
    });

    it('should throw an error if no images are found', async () => {
        const breed_id = 'unknown';
        imageRepository.getImagesByBreedId.mockResolvedValue([]);

        const result = await getImagesByBreedUseCase.execute(breed_id);

        expect(result).toEqual([]);
        expect(imageRepository.getImagesByBreedId).toHaveBeenCalledWith(breed_id);
    });
});
