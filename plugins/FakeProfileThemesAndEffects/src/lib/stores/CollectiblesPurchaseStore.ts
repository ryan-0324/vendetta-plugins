import { findByStoreName } from "@vendetta/metro";
import type tinycolor from "tinycolor2";

export interface Purchase {
    banner: string;
    categorySkuId: string;
    items: {
        asset: string;
        id: string;
        label: string;
        skuId: string;
        type: number;
    }[];
    name: string;
    premiumType: number | null;
    prices: {
        countryPrices: {
            countryCode: string;
            prices: {
                amount: number;
                currency: string;
                exponent: number;
            }[];
        };
    }[];
    purchaseType: number;
    purchasedAt: Date;
    skuId: string;
    storeListingId: string;
    styles: {
        backgroundColors: [typeof tinycolor, typeof tinycolor];
        buttonColors: [typeof tinycolor, typeof tinycolor];
        confettiColors: (typeof tinycolor)[];
    };
    summary: string;
    type: number;
    unpublishedAt: Date | null;
}

export const CollectiblesPurchaseStore: {
    readonly isFetching: boolean; // Getter
    readonly isClaiming: boolean; // Getter
    readonly purchases: Map<string, Purchase>; // Getter
    readonly fetchError: Error | undefined; // Getter
    readonly claimError: Error | undefined; // Getter
    getPurchase: (skuId: string | null | undefined) => Purchase | undefined;
} = findByStoreName("CollectiblesPurchaseStore");
