import dotenv from 'dotenv';
import axios from 'axios';
import { IBreedsRepository } from '../interfaces/IBreedsRepository';
import { Breed } from '../models/breeds.model';

dotenv.config();

export class BreedsRepository implements IBreedsRepository {
    private apiBaseUrl = process.env.API_BASE_URL!;
    private apiKey = process.env.API_KEY!;

    public async getAllBreeds(): Promise<Breed[]> {
        const response = await axios.get(`${this.apiBaseUrl}/breeds`, {
        });
        return response.data.map((data: any) => new Breed(
            data.id,
            data.name,
            data.origin,
            data.description,
            data.temperament,
            data.life_span
        ));
    }

    public async getBreedById(breed_id: string): Promise<Breed> {
        const response = await axios.get(`${this.apiBaseUrl}/breeds/${breed_id}`, {
        });
        const data = response.data;
        return new Breed(
            data.id,
            data.name,
            data.origin,
            data.description,
            data.temperament,
            data.life_span
        );
    }

    public async searchBreeds(query: object): Promise<Breed[]> {
        const queryString = new URLSearchParams(query as any).toString();
        const response = await axios.get(`${this.apiBaseUrl}/breeds/search?${queryString}`, {
        });
        return response.data.map((data: any) => new Breed(
            data.id,
            data.name,
            data.origin,
            data.description,
            data.temperament,
            data.life_span
        ));
    }
}
