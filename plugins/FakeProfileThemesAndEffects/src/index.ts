import patchGetUserProfile from "@patches/patchGetUserProfile";
import patchGuildProfileEditForm from "@patches/patchGuildProfileEditForm";
import patchUseProfileThemeColors from "@patches/patchUseProfileThemeColors";
import patchUserProfileEditForm from "@patches/patchUserProfileEditForm";
import Settings from "@ui/pages/Settings";

const patches: (() => boolean)[] = [];

export default {
    onLoad: () => {
        patches.push(
            patchGetUserProfile(),
            patchUseProfileThemeColors(),
            patchUserProfileEditForm(),
            patchGuildProfileEditForm()
        );
    },
    onUnload: () => patches.forEach(unpatchFn => {
        unpatchFn();
    }),
    settings: Settings
};
