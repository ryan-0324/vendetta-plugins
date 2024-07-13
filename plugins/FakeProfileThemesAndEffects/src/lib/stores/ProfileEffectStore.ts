import type { ExtractAction, FluxAction, FluxStore } from "@vencord/discord-types";
import { findByStoreName } from "@vendetta/metro";

import type { CollectiblesItemType } from "@lib/records";

export const ProfileEffectStore: $ProfileEffectStore
    = findByStoreName("ProfileEffectStore");

export type ProfileEffectStoreAction = ExtractAction<FluxAction, "LOGOUT" | "PROFILE_EFFECTS_SET_TRY_IT_OUT" | "USER_PROFILE_EFFECTS_FETCH" | "USER_PROFILE_EFFECTS_FETCH_FAILURE" | "USER_PROFILE_EFFECTS_FETCH_SUCCESS">;

declare class $ProfileEffectStore extends FluxStore<ProfileEffectStoreAction> {
    static displayName: "ProfileEffectStore";

    canFetch(): boolean;
    get fetchError(): Error | undefined;
    getProfileEffectById(effectId: string): ProfileEffect | undefined;
    hasFetched(): boolean;
    get isFetching(): boolean;
    get profileEffects(): ProfileEffect[];
    get tryItOutId(): string | null;
}

export interface ProfileEffect {
    config: ProfileEffectConfig;
    id: string;
    skuId: string;
}

export interface ProfileEffectConfig {
    accessibilityLabel: string;
    animationType: number;
    description: string;
    effects: {
        duartion: number;
        height: number;
        loop: boolean;
        loopDelay: number;
        position: {
            x: number;
            y: number;
        };
        src: string;
        start: number;
        width: number;
        zIndex: number;
    }[];
    id: string;
    reducedMotionSrc: string;
    sku_id: string;
    staticFrameSrc?: string;
    thumbnailPreviewSrc: string;
    title: string;
    type: CollectiblesItemType.PROFILE_EFFECT;
}
