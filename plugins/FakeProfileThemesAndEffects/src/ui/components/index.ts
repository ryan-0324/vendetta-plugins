import { findByProps } from "@vendetta/metro";
import { General } from "@vendetta/ui/components";
import type { Image as RNImage, PressableProps, ScrollView as RNScrollView, View as RNView } from "react-native";
import type { Path as RNSVGPath, Svg as RNSVGSvg } from "react-native-svg";

export { default as Builder } from "@ui/components/Builder";
export { default as BuilderButton } from "@ui/components/BuilderButton";
export { default as Button } from "@ui/components/Button";
export * as Forms from "@ui/components/forms";
export { default as Text } from "@ui/components/Text";

export const Image: typeof RNImage = General.Image;
export const ScrollView: typeof RNScrollView = General.ScrollView;
export const View: typeof RNView = General.View;

const svgModule = findByProps("Svg");
export const Svg: typeof RNSVGSvg = svgModule?.Svg ?? (() => null);
export const Path: typeof RNSVGPath = svgModule?.Path ?? (() => null);

export const PressableOpacity: React.ComponentType<PressableProps & {
    activeOpacity?: number | undefined;
}> = findByProps("PressableOpacity")?.PressableOpacity ?? (() => null);
