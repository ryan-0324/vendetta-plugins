import { findByStoreName } from "@vendetta/metro";

export interface ProfileEffect {
    config: {
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
        type: 1;
    };
    id: string;
    skuId: string;
}

export const ProfileEffectStore: {
    readonly isFetching: boolean; // Getter
    readonly fetchError: Error | undefined; // Getter
    readonly profileEffects: ProfileEffect[]; // Getter
    readonly tryItOutId: string | null; // Getter
    getProfileEffectById: (effectId: string | null | undefined) => ProfileEffect | undefined;
} = findByStoreName("ProfileEffectStore");
