import type { ExtractAction, FluxAction, FluxStore } from "@vencord/discord-types";
import { findByStoreName } from "@vendetta/metro";
import type tinycolor from "tinycolor2";

export const CollectiblesPurchaseStore: $CollectiblesPurchaseStore
    = findByStoreName("CollectiblesPurchaseStore");

export type CollectiblesPurchaseStoreAction = ExtractAction<FluxAction, "COLLECTIBLES_CLAIM" | "COLLECTIBLES_CLAIM_FAILURE" | "COLLECTIBLES_CLAIM_SUCCESS" | "COLLECTIBLES_PURCHASES_FETCH" | "COLLECTIBLES_PURCHASES_FETCH_FAILURE" | "COLLECTIBLES_PURCHASES_FETCH_SUCCESS" | "LOGOUT">;

declare class $CollectiblesPurchaseStore extends FluxStore<CollectiblesPurchaseStoreAction> {
    static displayName: "CollectiblesPurchaseStore";

    get claimError(): Error | undefined;
    get fetchError(): Error | undefined;
    getPurchase(skuId: string | null | undefined): Purchase | undefined;
    get isClaiming(): boolean;
    get isFetching(): boolean;
    get purchases(): Map<string, Purchase>;
}

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
