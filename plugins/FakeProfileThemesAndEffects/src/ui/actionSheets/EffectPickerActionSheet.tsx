import { findByName } from "@vendetta/metro";

import type { ProfileEffectRecord } from "@lib/profileEffects";
import { findElementInTree, getComponentNameFromType, RN } from "@lib/reactNativeRenderTree";
import type { User } from "@lib/stores/UserStore";

const effectPicker: RN.FunctionComponent = findByName("EditProfileEffectActionSheet") ?? (() => null);

export default ({ effects, onSelect, user, currentEffect }: {
    effects: { values(): IterableIterator<{ items: InstanceType<typeof ProfileEffectRecord>; }>; };
    onSelect: (effectRecord: InstanceType<typeof ProfileEffectRecord> | null) => void;
    user: User;
    currentEffect?: InstanceType<typeof ProfileEffectRecord> | null | undefined;
}) => {
    const tree = effectPicker({ user: user });
    const effectPickerInner: RN.Element<any> | null = findElementInTree(tree, e => getComponentNameFromType(e.type) === "EditProfileEffectInner");
    if (!effectPickerInner) return null;
    if (effectPickerInner.props.selectedProfileEffect === undefined)
        effectPickerInner.props.setSelectedProfileEffect(currentEffect ?? null);
    const applyButton: RN.Element<any> | null = findElementInTree(tree, e => getComponentNameFromType(e.type) === "Button");
    if (!applyButton) return null;
    effectPickerInner.props.purchases = effects;
    effectPickerInner.props.user.__FPTE__ = true;
    applyButton.props.onPress = () => {
        delete effectPickerInner.props.user.__FPTE__;
        onSelect(effectPickerInner.props.selectedProfileEffect);
    };
    return tree as JSX.Element;
};
