import { findByProps } from "@vendetta/metro";
import type { ComponentType, ReactNode } from "react";

export * from "./EffectPickerActionSheet";
export * from "./FallbackEffectPickerActionSheet";
export * from "./showColorPicker";
export * from "./showEffectPicker";

export const BottomSheet: ComponentType<any> = (findByProps("BottomSheet") as any)?.BottomSheet
    ?? (findByProps("ActionSheet") as any)?.ActionSheet
    ?? (() => { throw new Error("FakeProfileThemesAndEffects threw an error to avoid an otherwise-inevitable, unrecoverable freeze."); });

export const BottomSheetScrollView: ComponentType<any>
    = (findByProps("BottomSheetScrollView") as any)?.BottomSheetScrollView ?? (() => null);

const actionSheetModule: any = findByProps("showActionSheet");

export const showActionSheet: (props: {
    content: ReactNode;
    key: string;
    impressionName?: string | undefined;
    impressionProperties?: object | undefined;
    backdropKind?: string | undefined;
}) => void = actionSheetModule?.showActionSheet ?? (() => undefined);

export const hideActionSheet: (key?: string | undefined) => void
    = actionSheetModule?.default?.hideActionSheet ?? (() => undefined);
