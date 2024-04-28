import {
    patchGetPurchase,
    patchGetUserProfile,
    patchGuildProfileEditForm,
    patchUseProfileEffectSections,
    patchUseProfileThemeColors,
    patchUserProfileEditForm
} from "@patches";
import { Settings } from "@ui/pages";

const patches: (() => boolean)[] = [];

export default {
    onLoad() {
        patches.push(
            patchGetPurchase(),
            patchGetUserProfile(),
            patchGuildProfileEditForm(),
            ...patchUseProfileEffectSections(),
            patchUseProfileThemeColors(),
            patchUserProfileEditForm()
        );
    },
    onUnload() {
        patches.forEach(unpatch => {
            unpatch();
        });
    },
    settings: Settings
};
