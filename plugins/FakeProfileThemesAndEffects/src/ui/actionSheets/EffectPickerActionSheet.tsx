import { findByName } from "@vendetta/metro";
import { React } from "@vendetta/metro/common";

import { ProfileEffect, ProfileEffectRecord } from "@lib/profileEffects";
import { findElementInTree, getComponentNameFromType, RN } from "@lib/reactNativeRenderTree";
import type { User } from "@lib/stores/UserStore";
import FallbackEffectPickerActionSheet from "./FallbackEffectPickerActionSheet";

const { useMemo } = React;

const effectPicker: RN.FunctionComponent = findByName("EditProfileEffectActionSheet") ?? (() => null);

export interface EffectPickerActionSheetProps {
    effects: ProfileEffect[];
    onSelect: (effect: ProfileEffect | null) => void;
    user: User;
    currentEffectId?: string | undefined;
}

export default (props: EffectPickerActionSheetProps) => {
    const tree = effectPicker({ user: props.user });

    const effectPickerInner: RN.Element<any> | null = findElementInTree(tree, e => getComponentNameFromType(e.type) === "EditProfileEffectInner");
    if (!effectPickerInner) return FallbackEffectPickerActionSheet(props);

    const applyButton: RN.Element<any> | null = findElementInTree(tree, e => getComponentNameFromType(e.type) === "Button");
    if (!applyButton) return FallbackEffectPickerActionSheet(props);

    const effectRecords = useMemo(() => props.effects.map(e => ({ items: new ProfileEffectRecord({ id: e.id }) })), [props.effects]);

    if (effectPickerInner.props.selectedProfileEffect === undefined)
        effectPickerInner.props.setSelectedProfileEffect(effectRecords.find(r => r.items.id === props.currentEffectId) ?? null);

    effectPickerInner.props.purchases = effectRecords;

    effectPickerInner.props.user.__FPTE__ = true;

    applyButton.props.onPress = () => {
        delete effectPickerInner.props.user.__FPTE__;
        props.onSelect(props.effects.find(e => e.id === effectPickerInner.props.selectedProfileEffect?.id) ?? null);
    };

    return tree as JSX.Element;
};
