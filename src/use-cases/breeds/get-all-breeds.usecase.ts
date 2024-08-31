import { IBreedsRepository } from '../../interfaces/IBreedsRepository';

export class GetAllBreedsUseCase {
    private breedRepository: IBreedsRepository;

    constructor(breedRepository: IBreedsRepository) {
        this.breedRepository = breedRepository;
    }

    public async execute() {
        return this.breedRepository.getAllBreeds();
    }
}
