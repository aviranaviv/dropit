export interface AddProductItemTypes {
    id: number;
    properties: Record<string, unknown>;
    quantity: number;
    variant_id: number;
    key: string;
    title: string;
    product_title: string;
    variant_title: string;
    price: number;
    original_price: number;
    discounted_price: number;
    line_price: number;
    original_line_price: number;
    presentment_price: number;
    total_discount: number;
    discounts: any[];
    sku: string;
    grams: number;
    vendor: string;
    taxable: boolean;
    product_id: number;
    product_has_only_default_variant: boolean;
    gift_card: boolean;
    final_price: number;
    final_line_price: number;
    url: string;
    featured_image: {
        alt: string;
        aspect_ratio: number;
        height: number;
        url: string;
        width: number;
    };
    image: string;
    handle: string;
    requires_shipping: boolean;
    product_type: string;
    untranslated_product_title: string;
    product_description: string;
    untranslated_variant_title: string;
    variant_options: string[];
    options_with_values: Array<{
        name: string;
        value: string;
    }>;
    line_level_discount_allocations: any[];
    line_level_total_discount: number;
    sections: {
        'cart-notification-product': string;
        'cart-notification-button': string;
        'cart-icon-bubble': string;
    };
}
