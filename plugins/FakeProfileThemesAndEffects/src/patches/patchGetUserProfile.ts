import { after } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";

import { decodeColor, decodeColorsLegacy, decodeEffect, extractFPTE } from "@lib/fpte";
import UserProfileStore, { UserProfile } from "@lib/stores/UserProfileStore";

function updateUserThemeColors(user: UserProfile, primary: number, accent: number) {
    if (primary > -1) {
        user.themeColors = [primary, accent > -1 ? accent : primary];
        user.premiumType = 2;
    } else if (accent > -1) {
        user.themeColors = [accent, accent];
        user.premiumType = 2;
    }
}

function updateUserEffectId(user: UserProfile, id: bigint) {
    if (id > -1n) {
        user.profileEffectId = user.profileEffectID = id.toString();
        user.premiumType = 2;
    }
}

export default () => after("getUserProfile", UserProfileStore, (_: any, user: UserProfile | undefined) => {
    if (user === undefined) return user;

    if (storage.prioritizeNitro) {
        if (user.themeColors !== undefined) {
            if (user.profileEffectId === undefined && user.profileEffectID === undefined) {
                const fpte = extractFPTE(user.bio);
                if (decodeColor(fpte[0]) === -2)
                    updateUserEffectId(user, decodeEffect(fpte[1]));
                else
                    updateUserEffectId(user, decodeEffect(fpte[2]));
            }
            return user;
        } else if (user.profileEffectId !== undefined || user.profileEffectID !== undefined) {
            const fpte = extractFPTE(user.bio);
            const primaryColor = decodeColor(fpte[0]);
            if (primaryColor === -2)
                updateUserThemeColors(user, ...decodeColorsLegacy(fpte[0]));
            else
                updateUserThemeColors(user, primaryColor, decodeColor(fpte[1]));
            return user;
        }
    }

    const fpte = extractFPTE(user.bio);
    const primaryColor = decodeColor(fpte[0]);
    if (primaryColor === -2) {
        updateUserThemeColors(user, ...decodeColorsLegacy(fpte[0]));
        updateUserEffectId(user, decodeEffect(fpte[1]));
    } else {
        updateUserThemeColors(user, primaryColor, decodeColor(fpte[1]));
        updateUserEffectId(user, decodeEffect(fpte[2]));
    }
    return user;
});
