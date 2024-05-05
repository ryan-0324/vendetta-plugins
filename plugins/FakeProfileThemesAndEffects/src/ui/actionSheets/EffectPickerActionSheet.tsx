import { findByName } from "@vendetta/metro";
import { storage } from "@vendetta/plugin";
import React, { type ReactElement, type ReactNode, useMemo } from "react";

import { findElementInTree, findParentInTree, getComponentNameFromType, type RN } from "@lib/reactNativeRenderTree";
import { ProfileEffectRecord } from "@lib/records";
import type { ProfileEffect, User } from "@lib/stores";
import { setPreviewUserId } from "@patches/patchUseProfileTheme";
import { FallbackEffectPickerActionSheet } from "@ui/actionSheets";
import { ThemeContextProvider, useThemeContext } from "@ui/color";

export interface EffectPickerActionSheetProps {
    effects: ProfileEffect[];
    onSelect: (effect: ProfileEffect["config"] | null) => void;
    user: User;
    currentEffectId?: string | undefined;
}

const EffectPicker: RN.FunctionComponent | undefined = findByName("EditProfileEffectActionSheet");

let lastGoodTree: RN.Node;

function PatchedEffectPickerActionSheet(props: EffectPickerActionSheetProps) {
    const { currentEffectId, effects, onSelect, user } = props;

    const tree = EffectPicker!({ user });

    const themeContext = useThemeContext();

    const effectRecords = useMemo(() => effects.map(effect => ({ items: new ProfileEffectRecord(effect) })), [effects]);

    if (storage.forceFallbackEffectPicker)
        return <FallbackEffectPickerActionSheet {...props} />;

    let isLegacyEffectPicker = false;
    const effectPickerInner: RN.Element<any> | null = findElementInTree(tree, element => {
        if (getComponentNameFromType(element.type) === "EditProfileEffectInner")
            return true;
        if (
            "profileEffects" in element.props
            && "selectedProfileEffect" in element.props
            && typeof (element.props as any).setSelectedProfileEffect === "function"
        ) return isLegacyEffectPicker = true;
        return false;
    });
    if (!effectPickerInner) {
        if (lastGoodTree) return lastGoodTree as ReactElement;
        return <FallbackEffectPickerActionSheet {...props} />;
    }

    const applyButton: RN.Element<any> | null = findElementInTree(tree, element => getComponentNameFromType(element.type) === "Button");
    if (!applyButton) {
        if (lastGoodTree) return lastGoodTree as ReactElement;
        return <FallbackEffectPickerActionSheet {...props} />;
    }

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
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
                    children={profilePreview.props.children as ReactNode}
                />
            );

            baseProvider.props.theme = themeContext.theme;
            baseProvider.props.primaryColor = themeContext.primaryColor;
            baseProvider.props.secondaryColor = themeContext.secondaryColor;
        }
    } else {
        if (effectPickerInner.props.selectedProfileEffect === undefined)
            effectPickerInner.props.setSelectedProfileEffect(currentEffectId
                ? new ProfileEffectRecord({ id: currentEffectId })
                : null);
        effectPickerInner.props.purchases = effectRecords;
    }

    setPreviewUserId(user.id);
    applyButton.props.onPress = () => {
        setPreviewUserId(undefined);
        onSelect(effects.find(effect => effect.id === effectPickerInner.props.selectedProfileEffect?.id)?.config ?? null);
    };

    return (lastGoodTree = tree) as ReactElement;
}

export const EffectPickerActionSheet = EffectPicker
    ? PatchedEffectPickerActionSheet
    : FallbackEffectPickerActionSheet;
