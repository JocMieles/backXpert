export class Image {
    id: string;
    url: string;
    breed_id: string;

    constructor(id: string, url: string, breed_id: string) {
        this.id = id;
        this.url = url;
        this.breed_id = breed_id;
    }
}
