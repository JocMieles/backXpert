import { IBreedsRepository } from '../../interfaces/IBreedsRepository';

export class SearchBreedsUseCase {
    private breedRepository: IBreedsRepository;

    constructor(breedRepository: IBreedsRepository) {
        this.breedRepository = breedRepository;
    }

    public async execute(query: object) {
        return this.breedRepository.searchBreeds(query);
    }
}
