import type { FlashList as _FlashList } from "@shopify/flash-list";
import { findByName, findByProps } from "@vendetta/metro";
import type { ComponentType } from "react";
import type { PressableProps } from "react-native";
import type { Path as _Path, Svg as _Svg } from "react-native-svg";

export * from "./Builder";
export * from "./BuilderButton";
export * from "./Button";
export * as Forms from "./forms";
export * from "./Icon";
export * from "./StaticEffect";
export * from "./Text";

export const FlashList: typeof _FlashList = findByName("FlashList") ?? (() => null);

const svgModule: any = findByProps("Svg");
export const Svg: typeof _Svg = svgModule?.Svg ?? (() => null);
export const Path: typeof _Path = svgModule?.Path ?? (() => null);

export interface PressableOpacityProps extends PressableProps {
    activeOpacity?: number | undefined;
}

export const PressableOpacity: ComponentType<PressableOpacityProps> = (findByProps("PressableOpacity") as any)?.PressableOpacity ?? (() => null);
