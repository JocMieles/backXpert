import { IBreedsRepository } from '../../interfaces/IBreedsRepository';

export class GetBreedByIdUseCase {
    private breedRepository: IBreedsRepository;

    constructor(breedRepository: IBreedsRepository) {
        this.breedRepository = breedRepository;
    }

    public async execute(breedId: string) {
        return this.breedRepository.getBreedById(breedId);
    }
}
