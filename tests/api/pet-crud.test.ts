import { expect, test } from '@playwright/test';

import Pet from '@/modules/pet-store/pet';
import { PetResponseTypes } from '@/modules/pet-store/response/pet-response-types';

let petApi: Pet;

test.describe('Pet - CRUD', () => {
    test.beforeEach(async ({ request }) => {
        petApi = new Pet(request);
    });

    test('Should be able to create and update the pet status', async () => {
        const payload = petApi.compilePetPayload();
        const createResponse = await petApi.createPet(payload);

        expect(createResponse.status()).toBe(200);
        const responseCreatedData: PetResponseTypes = await createResponse.json();
        expect(responseCreatedData.status).toBe('available');

        payload.status = 'sold';
        const updateResponse = await petApi.updatePet(payload);

        expect(updateResponse.status()).toBe(200);
        const responseUpdatedData: PetResponseTypes = await updateResponse.json();
        expect(responseUpdatedData.status).toBe('sold');

    });


    test('should be able to get pet by the available status ', async () => {
        const getResponse = await petApi.getPetByStatus('available');
        expect(getResponse.status()).toBe(200);

        const getResponseData: PetResponseTypes[] = await getResponse.json();

        // the test will fail because of the name of fourth place is TestPet
        expect(getResponseData[3].name).toBe('Puff');
        console.log(getResponseData[3]);
    });

    test('should be able to get pet by the sold status ', async () => {
        const getResponse = await petApi.getPetByStatus('sold');
        expect(getResponse.status()).toBe(200);

        const getResponseData: PetResponseTypes[] = await getResponse.json();

        getResponseData.forEach((pet) => {
            expect(pet.status).toBe('sold');
        });
    });
});
