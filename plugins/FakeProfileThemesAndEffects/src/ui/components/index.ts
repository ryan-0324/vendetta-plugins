import type { FlashList as $FlashList } from "@shopify/flash-list";
import { findByName, findByProps } from "@vendetta/metro";
import type { ComponentType } from "react";
import type { PressableProps } from "react-native";
import type { Path as $Path, Svg as $Svg } from "react-native-svg";

export * from "./Builder";
export * from "./BuilderButton";
export * from "./Button";
export * as Forms from "./forms";
export * from "./Icon";
export * from "./StaticEffect";
export * from "./Text";

export const FlashList: typeof $FlashList = findByName("FlashList") ?? (() => null);

// Must use `as` or else `undefined` is lost due to a TS bug
const svgModule = findByProps("Svg") as Record<string, any> | undefined;
export const Svg: typeof $Svg = svgModule?.Svg ?? (() => null);
export const Path: typeof $Path = svgModule?.Path ?? (() => null);

export interface PressableOpacityProps extends PressableProps {
    activeOpacity?: number | undefined;
}

export const PressableOpacity: ComponentType<PressableOpacityProps>
    = (findByProps("PressableOpacity") as Record<string, any> | undefined)?.PressableOpacity
    ?? (() => null);
