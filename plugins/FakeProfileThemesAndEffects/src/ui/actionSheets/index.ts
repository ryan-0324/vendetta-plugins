import { findByProps } from "@vendetta/metro";

export { default as showColorPicker } from "@ui/actionSheets/showColorPicker";
export { default as showEffectPicker } from "@ui/actionSheets/showEffectPicker";

export const ActionSheet: React.ComponentType<any> = findByProps("ActionSheet")?.ActionSheet
    ?? (() => { throw new Error("FakeProfileThemesAndEffects threw an error to avoid an otherwise-inevitable, unrecoverable freeze."); });

export const BottomSheetScrollView: React.ComponentType<any>
    = findByProps("BottomSheetScrollView")?.BottomSheetScrollView ?? (() => null);

const actionSheetModule = findByProps("showActionSheet");

export const showActionSheet: (props: {
    content: React.ReactNode;
    key: string;
    impressionName?: string | undefined;
    impressionProperties?: object | undefined;
    backdropKind?: string | undefined;
}) => void = actionSheetModule?.showActionSheet ?? (() => {});

export const hideActionSheet: (key?: string | undefined) => void
    = actionSheetModule?.default?.hideActionSheet ?? (() => {});
