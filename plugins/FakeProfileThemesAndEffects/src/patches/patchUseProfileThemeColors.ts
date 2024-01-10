import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";

import UserStore, { User } from "@lib/stores/UserStore";
import { isNonNullObject } from "@lib/utils";

export interface MarkedUser extends User {
    [shouldUsePreviewTheme]?: undefined;
}

export const shouldUsePreviewTheme = Symbol();

const pvCfg = {
    primaryColor: -1,
    accentColor: -1,
    showPreview: true
};

export { pvCfg as previewConfig };

const useProfileThemeColorsModule = findByName("useProfileThemeColors", false);

export default () => after("default", useProfileThemeColorsModule, (args, originalReturn) => {
    if (
        args?.[0]?.id === UserStore.getCurrentUser().id
        && (
            isNonNullObject(args[2]) && "pendingThemeColors" in args[2]
            || isNonNullObject(args[0]) && shouldUsePreviewTheme in args[0]
        )
        && pvCfg.showPreview
    ) {
        if (pvCfg.primaryColor > -1)
            return [pvCfg.primaryColor, pvCfg.accentColor > -1 ? pvCfg.accentColor : pvCfg.primaryColor];
        if (pvCfg.accentColor > -1)
            return [pvCfg.accentColor, pvCfg.accentColor];
    }
    return originalReturn;
});
