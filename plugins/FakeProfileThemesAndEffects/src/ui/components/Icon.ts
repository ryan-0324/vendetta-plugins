import { findByProps } from "@vendetta/metro";
import type { ComponentType } from "react";
import type { ColorValue, ImageProps } from "react-native";

export type SizeKey = "EXTRA_SMALL_10" | "EXTRA_SMALL" | "SMALL" | "SMALL_20" | "MEDIUM" | "LARGE" | "CUSTOM" | "REFRESH_SMALL_16" | "SMALL_14";

export interface IconProps extends Pick<ImageProps, "accessible" | "accessibilityLabel" | "resizeMode" | "source" | "style"> {
    size?: string | undefined;
    color?: ColorValue | undefined;
    disableColor?: boolean | undefined;
}

export const Icon: ComponentType<IconProps> & {
    Sizes: Record<SizeKey, string>;
} = (findByProps("IconSizes") as any)?.default ?? (() => null);
