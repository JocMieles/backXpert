import { GetAllBreedsUseCase } from '../use-cases/breeds/get-all-breeds.usecase';
import { GetBreedByIdUseCase } from '../use-cases/breeds/get-breed-by-id.usecase';
import { SearchBreedsUseCase } from '../use-cases/breeds/search-breeds.usecase';

export class BreedsService {
    private getAllBreedsUseCase: GetAllBreedsUseCase;
    private getBreedByIdUseCase: GetBreedByIdUseCase;
    private searchBreedsUseCase: SearchBreedsUseCase;

    constructor(
        getAllBreedsUseCase: GetAllBreedsUseCase,
        getBreedByIdUseCase: GetBreedByIdUseCase,
        searchBreedsUseCase: SearchBreedsUseCase
    ) {
        this.getAllBreedsUseCase = getAllBreedsUseCase;
        this.getBreedByIdUseCase = getBreedByIdUseCase;
        this.searchBreedsUseCase = searchBreedsUseCase;
    }

    public async getAllBreeds() {
        return await this.getAllBreedsUseCase.execute();
    }

    public async getBreedById(breed_id: string) {
        return await this.getBreedByIdUseCase.execute(breed_id);
    }

    public async searchBreeds(query: object) {
        const search = await this.searchBreedsUseCase.execute(query);
        return search;
    }
}
