interface Category {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
}

export interface PetPayloadTypes {
    id: number;
    category: Category;
    name: string;
    photoUrls: string[];
    tags: Tag[];
    status: string;
}
