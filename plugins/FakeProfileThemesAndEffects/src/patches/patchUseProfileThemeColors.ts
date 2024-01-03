import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";

import UserStore from "@lib/stores/UserStore";
import { isNonNullObject } from "@lib/utils";

const useProfileThemeColorsModule = findByName("useProfileThemeColors", false);
const userId = UserStore.getCurrentUser().id;

const pvCfg = {
    primaryColor: -1,
    accentColor: -1,
    showPreview: true
};

export { pvCfg as previewConfig };

export default () => after("default", useProfileThemeColorsModule, (args, originalReturn) => {
    if (args?.[0]?.id === userId && (isNonNullObject(args[2]) && "pendingThemeColors" in args[2] || args[0].__FPTE__) && pvCfg.showPreview) {
        if (pvCfg.primaryColor > -1)
            return [pvCfg.primaryColor, pvCfg.accentColor > -1 ? pvCfg.accentColor : pvCfg.primaryColor];
        if (pvCfg.accentColor > -1)
            return [pvCfg.accentColor, pvCfg.accentColor];
    }
    return originalReturn;
});
