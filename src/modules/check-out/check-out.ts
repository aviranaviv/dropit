import {Page} from '@playwright/test';

import siteEndpoints from '@/infrastructure/site-endpoints';
import {submitForCompletionResponseTypes} from '@/modules/check-out/response/types';

export class CheckOutApi {
    private static instance: CheckOutApi;

    static getInstance(): CheckOutApi {
        if (!CheckOutApi.instance) {
            CheckOutApi.instance = new CheckOutApi();
        }
        return CheckOutApi.instance;
    }

    async submitCompletionResponse(page: Page): Promise<submitForCompletionResponseTypes> {
        try {
            const response = await page.waitForResponse(response =>
                response.request().method() === 'POST' && response.url().includes(siteEndpoints.checkOuts.submitForCompletion)
            );

            const status = response.status();
            if (status !== 200 ) {
                throw new Error(`Failed to get response, status code: ${status}`);
            }

            return response.json();
        } catch (error) {
            throw new Error(`Failed to get response ${error}`);
        }
    }
}
