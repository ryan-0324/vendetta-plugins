import { findByProps } from "@vendetta/metro";
import type { ComponentType, ReactNode } from "react";

export * from "./EffectPickerActionSheet";
export * from "./FallbackEffectPickerActionSheet";
export * from "./showColorPicker";
export * from "./showEffectPicker";

export const BottomSheet: ComponentType<Record<string, any>>
    = (findByProps("BottomSheet") as Record<string, any> | undefined)?.BottomSheet
    ?? (findByProps("ActionSheet") as Record<string, any> | undefined)?.ActionSheet
    ?? (() => { throw new Error("FakeProfileThemesAndEffects threw an error to avoid an otherwise-inevitable, unrecoverable freeze."); });

export const BottomSheetScrollView: ComponentType<any>
    = (findByProps("BottomSheetScrollView") as any)?.BottomSheetScrollView ?? (() => null);

// Must use `as` or else `undefined` is lost due to a TS bug
const actionSheetModule = findByProps("showActionSheet") as Record<string, any> | undefined;

export const showActionSheet: (props: {
    content: ReactNode;
    key: string;
    impressionName?: string | undefined;
    impressionProperties?: object | undefined;
    backdropKind?: string | undefined;
}) => void = actionSheetModule?.showActionSheet ?? (() => undefined);

export const hideActionSheet: (key?: string | undefined) => void
    = actionSheetModule?.default?.hideActionSheet ?? (() => undefined);
