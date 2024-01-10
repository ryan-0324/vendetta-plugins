import { findByName } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";

import { ProfileEffect, ProfileEffectRecord } from "@lib/profileEffects";
import { findElementInTree, findParentInTree, getComponentNameFromType, RN } from "@lib/reactNativeRenderTree";
import { MarkedUser, shouldUsePreviewTheme } from "@patches/patchUseProfileThemeColors";
import FallbackEffectPickerActionSheet from "@ui/actionSheets/FallbackEffectPickerActionSheet";
import { ThemeContextProvider, useThemeContext } from "@ui/color";

const { useMemo } = React;

export interface EffectPickerActionSheetProps {
    effects: ProfileEffect[];
    onSelect: (effect: ProfileEffect | null) => void;
    user: MarkedUser;
    currentEffectId?: string | undefined;
}

const EffectPicker: RN.FunctionComponent | undefined = findByName("EditProfileEffectActionSheet");

let lastGoodTree: RN.Node;

function PatchedEffectPickerActionSheet(props: EffectPickerActionSheetProps) {
    const tree = EffectPicker!({ user: props.user });

    const themeContext = useThemeContext();

    const effectRecords = useMemo(() => props.effects.map(e => ({ items: new ProfileEffectRecord({ id: e.id }) })), [props.effects]);

    let isLegacyEffectPicker = false;
    const effectPickerInner: RN.Element<any> | null = findElementInTree(tree, e => {
        if (getComponentNameFromType(e.type) === "EditProfileEffectInner")
            return true;
        if (
            "profileEffects" in e.props
            && "selectedProfileEffect" in e.props
            && typeof (e.props as any).setSelectedProfileEffect === "function"
        ) return isLegacyEffectPicker = true;
        return false;
    });
    if (!effectPickerInner) {
        if (lastGoodTree) return lastGoodTree as JSX.Element;
        return FallbackEffectPickerActionSheet(props);
    }

    const applyButton: RN.Element<any> | null = findElementInTree(tree, e => getComponentNameFromType(e.type) === "Button");
    if (!applyButton) {
        if (lastGoodTree) return lastGoodTree as JSX.Element;
        return FallbackEffectPickerActionSheet(props);
    }

    if (isLegacyEffectPicker) {
        if (effectPickerInner.props.selectedProfileEffect === undefined)
            effectPickerInner.props.setSelectedProfileEffect(props.currentEffectId
                ? { id: props.currentEffectId }
                : null);
        effectPickerInner.props.profileEffects = props.effects;

        const profilePreview = findParentInTree(tree, children =>
            Array.isArray(children) && children.some(child =>
                getComponentNameFromType(child.type) === "DisplayBanner"));
        if (profilePreview) {
            const baseProvider = tree as RN.Element<any>;

            profilePreview.props.children = (
                <ThemeContextProvider
                    theme={baseProvider.props.theme}
                    primaryColor={baseProvider.props.primaryColor}
                    secondaryColor={baseProvider.props.secondaryColor}
                    children={profilePreview.props.children as React.ReactNode}
                />
            );

            baseProvider.props.theme = themeContext.theme;
            baseProvider.props.primaryColor = themeContext.primaryColor;
            baseProvider.props.secondaryColor = themeContext.secondaryColor;
        }
    } else {
        if (effectPickerInner.props.selectedProfileEffect === undefined)
            effectPickerInner.props.setSelectedProfileEffect(props.currentEffectId
                ? new ProfileEffectRecord({ id: props.currentEffectId })
                : null);
        effectPickerInner.props.purchases = effectRecords;
    }

    props.user[shouldUsePreviewTheme] = undefined;
    applyButton.props.onPress = () => {
        delete props.user[shouldUsePreviewTheme];
        props.onSelect(props.effects.find(e => e.id === effectPickerInner.props.selectedProfileEffect?.id) ?? null);
    };

    return lastGoodTree = tree as JSX.Element;
}

export default EffectPicker
    ? PatchedEffectPickerActionSheet
    : FallbackEffectPickerActionSheet;
