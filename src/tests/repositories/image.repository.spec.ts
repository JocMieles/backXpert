import { ImageRepository } from '../../repositories/image.repository';
import { Image } from '../../models/image.model';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ImageRepository', () => {
    let imageRepository: ImageRepository;

    beforeEach(() => {
        imageRepository = new ImageRepository();
    });

    it('should return images for a given breed id', async () => {
        const breedId = 'emau';
        const apiResponse = {
            data: [
                {
                    id: 'image1',
                    url: 'http://image-url.com/1',
                },
                {
                    id: 'image2',
                    url: 'http://image-url.com/2',
                },
            ],
        };

        // Mocking the axios GET request
        mockedAxios.get.mockResolvedValue(apiResponse);

        // Call the method
        const result = await imageRepository.getImagesByBreedId(breedId);

        // Expected output
        const expectedImages: Image[] = [
            new Image('image1', 'http://image-url.com/1', breedId),
            new Image('image2', 'http://image-url.com/2', breedId),
        ];

        // Assertions
        expect(result).toEqual(expectedImages);
        expect(mockedAxios.get).toHaveBeenCalledWith(
            `${process.env.API_BASE_URL}/images/search`,
            {
                headers: { 'x-api-key': process.env.API_KEY },
                params: { breed_id: breedId, limit: 100 },
            }
        );
    });
});
