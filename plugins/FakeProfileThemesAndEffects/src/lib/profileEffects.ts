import { findByName, findByProps } from "@vendetta/metro";
import { getAssetIDByName } from "@vendetta/ui/assets";
import type { ImageSourcePropType } from "react-native";

export interface ProfileEffect {
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
}

export const USER_PROFILE_EFFECTS_URL = "/user-profile-effects";

export const SAMPLE_PROFILE_SMALL: ImageSourcePropType = getAssetIDByName("sample-profile-small")
    ?? { uri: "https://discordapp.com/assets/f328a6f8209d4f1f5022.png" };

export const PROFILE_EFFECT_WH_RATIO: number = findByProps("DEFAULT_PROFILE_EFFECT_WH_RATIO")?.DEFAULT_PROFILE_EFFECT_WH_RATIO ?? 45 / 88;

export const ProfileEffectRecord: {
    new (props: { id: string; sku_id?: string | undefined }): { id: string; sku_id: string | undefined; type: 1; };
    fromServer: (props: { id?: string | undefined; sku_id: string }) => { id: string | undefined; sku_id: string; type: 1; };
} = findByName("ProfileEffectRecord");
