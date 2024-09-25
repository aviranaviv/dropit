interface Category {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
}

export interface PetResponseTypes {
    id: number;
    category: Category;
    name: string;
    photoUrls: string[];
    tags: Tag[];
    status: string;
    code?: string;
    type?: string;
    message?: string;
}
