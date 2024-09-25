import {APIResponse} from '@playwright/test';
import {type APIRequestContext} from 'playwright';

import petStoreEndpoints from '@/infrastructure/pet-store-endpoints';
import {petPayload} from '@/modules/pet-store/payloads/pet-payload';
import {PetPayloadTypes} from '@/modules/pet-store/payloads/types';

const baseUrl:string = petStoreEndpoints.petStore.baseUrl;
const endPoint:string = petStoreEndpoints.petStore.pet;
const findPetByStatusEndPoints = petStoreEndpoints.petStore.petStatus;

export default class Pet {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    /**
     * Retrieves pet information by status.
     * @param {string} [status] - The status of the pet to retrieve.
     * @returns {Promise<APIResponse>} A promise that resolves with the API response.
     */
    async getPetByStatus(status: 'available' | 'pending' | 'sold'): Promise<APIResponse> {
        return this.request.get(`${baseUrl}${endPoint}${findPetByStatusEndPoints}?status=${status}`);
    }

    /**
     * Creates a new pet.
     * @param {any} payload - The data for creating the pet.
     * @returns {Promise<APIResponse>} A promise that resolves with the API response.
     */
    async createPet(payload: PetPayloadTypes): Promise<APIResponse> {
        return this.request.post(`${baseUrl}${endPoint}`, {data: payload});
    }

    /**
     * Update a new pet.
     * @param {any} payload - The data for updating the pet.
     * @returns {Promise<APIResponse>} A promise that resolves with the API response.
     */
    async updatePet(payload: PetPayloadTypes): Promise<APIResponse> {
        return this.request.put(`${baseUrl}${endPoint}`, {data: payload});
    }

    /**
     * Compiles the pet payload with the given options and returns the payload object.
     * @param {Object} options - The options object to specify the pet's status.
     * @param {'available' | 'pending' | 'sold'} options.status - The status of the pet.
     *   Can be 'available', 'pending', or 'sold'. Defaults to 'available' if no status is provided.
     * @returns {PetPayloadTypes} The compiled pet payload object with the specified status.
     */
    compilePetPayload(options?: {status: 'available' | 'pending' | 'sold'}): PetPayloadTypes {
        petPayload.status = options?.status || 'available';
        return petPayload;
    }
}
