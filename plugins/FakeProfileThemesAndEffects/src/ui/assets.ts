import { findByProps } from "@vendetta/metro";
import { getAssetIDByName } from "@vendetta/ui/assets";
import type { ImageSourcePropType } from "react-native";

export const IMG_NONE = getAssetIDByName("img_none");

export const PROFILE_EFFECT_WH_RATIO: number
    = (findByProps("DEFAULT_PROFILE_EFFECT_WH_RATIO") as Record<string, any> | undefined)?.DEFAULT_PROFILE_EFFECT_WH_RATIO
    ?? 45 / 88;

export const SAMPLE_PROFILE_SMALL: ImageSourcePropType
    = (getAssetIDByName("sample-profile-small") as number | undefined)
    ?? { uri: "https://discordapp.com/assets/f328a6f8209d4f1f5022.png" };

export const TOAST_TYPE_COPY = getAssetIDByName("toast_copy_link");

export const TOAST_TYPE_FAILURE = getAssetIDByName("Small");
