export class Breed {
    id: string;
    name: string;
    origin: string;
    description: string;
    temperament: string;
    life_span: string;

    constructor(
        id: string,
        name: string,
        origin: string,
        description: string,
        temperament: string,
        life_span: string
    ) {
        this.id = id;
        this.name = name;
        this.origin = origin;
        this.description = description;
        this.temperament = temperament;
        this.life_span = life_span;
    }
}
