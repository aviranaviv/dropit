export interface submitForCompletionResponseTypes {
    data: {
        submitForCompletion: {
            receipt: {
                id: string;
                purchaseOrder: {
                    __typename: string;
                    sessionToken: string;
                    totalAmountToPay: {
                        amount: string;
                        currencyCode: string;
                        __typename: string;
                    };
                    checkoutCompletionTarget: string;
                    delivery: {
                        deliveryLines: {
                            __typename: string;
                            availableOn: string;
                            deliveryStrategy: {
                                handle: string;
                                title: string;
                                description?: any;
                                methodType: string;
                                brandedPromise?: any;
                                pickupLocation?: any;
                                deliveryPromisePresentmentTitle: {
                                    short: string;
                                    long: string;
                                    __typename: string;
                                };
                                __typename: string;
                            };
                            lineAmount: {
                                amount: string;
                                currencyCode: string;
                                __typename: string;
                            };
                            lineAmountAfterDiscounts: {
                                amount: string;
                                currencyCode: string;
                                __typename: string;
                            };
                            destinationAddress: {
                                name: string;
                                firstName?: any;
                                lastName: string;
                                company?: any;
                                address1: string;
                                address2?: any;
                                city: string;
                                countryCode: string;
                                zoneCode?: any;
                                postalCode?: any;
                                coordinates: {
                                    latitude: number;
                                    longitude: number;
                                    __typename: string;
                                };
                                phone?: any;
                                __typename: string;
                            };
                            groupType: string;
                            targetMerchandise: {
                                stableId: string;
                                quantity: {
                                    items: number;
                                    __typename: string;
                                };
                                merchandise: {
                                    variantId: string;
                                    options: {
                                        name: string;
                                        value: string;
                                        __typename: string;
                                    }[];
                                    productTitle: string;
                                    title: string;
                                    productUrl: string;
                                    untranslatedTitle: string;
                                    untranslatedSubtitle: string;
                                    sellingPlan?: any;
                                    deferredAmount: {
                                        amount: string;
                                        currencyCode: string;
                                        __typename: string;
                                    };
                                    digest: string;
                                    giftCard: boolean;
                                    image: {
                                        altText?: any;
                                        one: string;
                                        two: string;
                                        four: string;
                                        __typename: string;
                                    };
                                    price: {
                                        amount: string;
                                        currencyCode: string;
                                        __typename: string;
                                    };
                                    productId: string;
                                    productType: string;
                                    properties: any[];
                                    requiresShipping: boolean;
                                    sku: string;
                                    taxCode?: any;
                                    taxable: boolean;
                                    vendor: string;
                                    weight: {
                                        unit: string;
                                        value: number;
                                        __typename: string;
                                    };
                                    __typename: string;
                                };
                                legacyFee: boolean;
                                __typename: string;
                            }[];
                        }[];
                        __typename: string;
                    };
                    deliveryExpectations: any[];
                    payment: {
                        billingAddress: {
                            name: string;
                            firstName?: any;
                            lastName: string;
                            company?: any;
                            address1: string;
                            address2?: any;
                            city: string;
                            countryCode: string;
                            zoneCode?: any;
                            postalCode?: any;
                            coordinates: {
                                latitude: number;
                                longitude: number;
                                __typename: string;
                            };
                            phone?: any;
                            __typename: string;
                        };
                        paymentLines: {
                            amount: {
                                amount: string;
                                currencyCode: string;
                                __typename: string;
                            };
                            postPaymentMessage?: any;
                            dueAt?: any;
                            paymentMethod: {
                                sessionId: string;
                                paymentMethodIdentifier: string;
                                vaultingAgreement: boolean;
                                creditCard: {
                                    brand: string;
                                    lastDigits: string;
                                    __typename: string;
                                };
                                billingAddress: {
                                    name: string;
                                    firstName?: any;
                                    lastName: string;
                                    company?: any;
                                    address1: string;
                                    address2?: any;
                                    city: string;
                                    countryCode: string;
                                    zoneCode?: any;
                                    postalCode?: any;
                                    coordinates: {
                                        latitude: number;
                                        longitude: number;
                                        __typename: string;
                                    };
                                    phone?: any;
                                    __typename: string;
                                };
                                __typename: string;
                            };
                            __typename: string;
                        }[];
                        __typename: string;
                    };
                    buyerIdentity: {
                        contactMethod: {
                            email: string;
                            __typename: string;
                        };
                        marketingConsent: any[];
                        __typename: string;
                        customer: {
                            __typename: string;
                            presentmentCurrency: string;
                            countryCode: string;
                            market: {
                                id: string;
                                handle: string;
                                __typename: string;
                            };
                        };
                        purchasingCompany?: any;
                    };
                    merchandise: {
                        taxesIncluded: boolean;
                        merchandiseLines: {
                            stableId: string;
                            legacyFee: boolean;
                            merchandise: {
                                variantId: string;
                                options: {
                                    name: string;
                                    value: string;
                                    __typename: string;
                                }[];
                                productTitle: string;
                                title: string;
                                productUrl: string;
                                untranslatedTitle: string;
                                untranslatedSubtitle: string;
                                sellingPlan?: any;
                                deferredAmount: {
                                    amount: string;
                                    currencyCode: string;
                                    __typename: string;
                                };
                                digest: string;
                                giftCard: boolean;
                                image: {
                                    altText?: any;
                                    one: string;
                                    two: string;
                                    four: string;
                                    __typename: string;
                                };
                                price: {
                                    amount: string;
                                    currencyCode: string;
                                    __typename: string;
                                };
                                productId: string;
                                productType: string;
                                properties: any[];
                                requiresShipping: boolean;
                                sku: string;
                                taxCode?: any;
                                taxable: boolean;
                                vendor: string;
                                weight: {
                                    unit: string;
                                    value: number;
                                    __typename: string;
                                };
                                __typename: string;
                            };
                            lineAllocations: {
                                checkoutPriceAfterDiscounts: {
                                    amount: string;
                                    currencyCode: string;
                                    __typename: string;
                                };
                                checkoutPriceAfterLineDiscounts: {
                                    amount: string;
                                    currencyCode: string;
                                    __typename: string;
                                };
                                checkoutPriceBeforeReductions: {
                                    amount: string;
                                    currencyCode: string;
                                    __typename: string;
                                };
                                quantity: number;
                                stableId: string;
                                totalAmountAfterDiscounts: {
                                    amount: string;
                                    currencyCode: string;
                                    __typename: string;
                                };
                                totalAmountAfterLineDiscounts: {
                                    amount: string;
                                    currencyCode: string;
                                    __typename: string;
                                };
                                totalAmountBeforeReductions: {
                                    amount: string;
                                    currencyCode: string;
                                    __typename: string;
                                };
                                discountAllocations: any[];
                                unitPrice?: any;
                                __typename: string;
                            }[];
                            lineComponents: any[];
                            quantity: {
                                items: number;
                                __typename: string;
                            };
                            recurringTotal?: any;
                            lineAmount: {
                                amount: string;
                                currencyCode: string;
                                __typename: string;
                            };
                            __typename: string;
                        }[];
                        __typename: string;
                    };
                    tax: {
                        totalTaxAmountV2: {
                            amount: string;
                            currencyCode: string;
                            __typename: string;
                        };
                        totalDutyAmount?: any;
                        totalTaxAndDutyAmount: {
                            amount: string;
                            currencyCode: string;
                            __typename: string;
                        };
                        totalAmountIncludedInTarget?: any;
                        __typename: string;
                    };
                    discounts: {
                        lines: any[];
                        __typename: string;
                    };
                    legacyRepresentProductsAsFees: boolean;
                    totalSavings: {
                        amount: string;
                        currencyCode: string;
                        __typename: string;
                    };
                    subtotalBeforeTaxesAndShipping: {
                        amount: string;
                        currencyCode: string;
                        __typename: string;
                    };
                    legacySubtotalBeforeTaxesShippingAndFees: {
                        amount: string;
                        currencyCode: string;
                        __typename: string;
                    };
                    legacyAggregatedMerchandiseTermsAsFees: any[];
                    landedCostDetails: {
                        incotermInformation?: any;
                        __typename: string;
                    };
                    optionalDuties: {
                        buyerRefusesDuties: boolean;
                        refuseDutiesPermitted: boolean;
                        __typename: string;
                    };
                    dutiesIncluded: boolean;
                    tip: {
                        tipLines: any[];
                        __typename: string;
                    };
                    hasOnlyDeferredShipping: boolean;
                    note: {
                        customAttributes: any[];
                        message?: any;
                        __typename: string;
                    };
                    shopPayArtifact: {
                        optIn?: any;
                        __typename: string;
                    };
                    recurringTotals: any[];
                    checkoutTotalBeforeTaxesAndShipping?: any;
                    checkoutTotal: {
                        amount: string;
                        currencyCode: string;
                        __typename: string;
                    };
                    checkoutTotalTaxes?: any;
                    subtotalBeforeReductions: {
                        amount: string;
                        currencyCode: string;
                        __typename: string;
                    };
                    deferredTotal?: any;
                    metafields: any[];
                };
                pollDelay: number;
                __typename: string;
            };
            __typename: string;
        };
    };
}
