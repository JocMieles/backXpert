export interface IBreedsRepository {
    getAllBreeds(): Promise<any>;
    getBreedById(breed_id: string): Promise<any>;
    searchBreeds(query: object): Promise<any>;
}
