import { ImageService } from '../../services/image.service';
import { GetImagesByBreedUseCase } from '../../use-cases/image/get-images-by-breeds.usecase';
import { Image } from '../../models/image.model';

describe('ImageService', () => {
    let imageService: ImageService;
    let getImagesByBreedUseCase: jest.Mocked<GetImagesByBreedUseCase>;

    beforeEach(() => {
        // Mocking the GetImagesByBreedUseCase
        getImagesByBreedUseCase = {
            execute: jest.fn(),
        } as unknown as jest.Mocked<GetImagesByBreedUseCase>;

        // Initializing ImageService with the mocked use case
        imageService = new ImageService(getImagesByBreedUseCase);
    });

    it('should return images for a given breed id', async () => {
        const images: Image[] = [
            new Image('image1', 'http://image-url.com/1', 'emau'),
        ];

        // Mock the return value of the execute method
        getImagesByBreedUseCase.execute.mockResolvedValue(images);

        // Call the service method
        const result = await imageService.getImagesByBreedId('emau');

        // Assertions
        expect(result).toEqual(images);
        expect(getImagesByBreedUseCase.execute).toHaveBeenCalledWith('emau');
    });
});
