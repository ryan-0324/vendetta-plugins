import { after } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";

import { decodeColor, decodeColorsLegacy, decodeEffect, extractFPTE } from "@lib/fpte";
import { type UserProfile, UserProfileStore } from "@lib/stores";

function updateProfileThemeColors(profile: UserProfile, primary: number, accent: number) {
    if (primary > -1) {
        profile.themeColors = [primary, accent > -1 ? accent : primary];
        profile.premiumType = 2;
    } else if (accent > -1) {
        profile.themeColors = [accent, accent];
        profile.premiumType = 2;
    }
}

function updateProfileEffectId(profile: UserProfile, id: bigint) {
    if (id > -1n) {
        profile.profileEffectId = profile.profileEffectID = id.toString();
        profile.premiumType = 2;
    }
}

export const patchGetUserProfile = () => after("getUserProfile", UserProfileStore, (_args, profile: UserProfile | undefined) => {
    if (!profile) return profile;

    if (storage.prioritizeNitro) {
        if (profile.themeColors) {
            if (!(profile.profileEffectId || profile.profileEffectID)) {
                const fpte = extractFPTE(profile.bio);
                if (decodeColor(fpte[0]) === -2)
                    updateProfileEffectId(profile, decodeEffect(fpte[1]));
                else
                    updateProfileEffectId(profile, decodeEffect(fpte[2]));
            }
            return profile;
        } else if (profile.profileEffectId || profile.profileEffectID) {
            const fpte = extractFPTE(profile.bio);
            const primaryColor = decodeColor(fpte[0]);
            if (primaryColor === -2)
                updateProfileThemeColors(profile, ...decodeColorsLegacy(fpte[0]));
            else
                updateProfileThemeColors(profile, primaryColor, decodeColor(fpte[1]));
            return profile;
        }
    }

    const fpte = extractFPTE(profile.bio);
    const primaryColor = decodeColor(fpte[0]);
    if (primaryColor === -2) {
        updateProfileThemeColors(profile, ...decodeColorsLegacy(fpte[0]));
        updateProfileEffectId(profile, decodeEffect(fpte[1]));
    } else {
        updateProfileThemeColors(profile, primaryColor, decodeColor(fpte[1]));
        updateProfileEffectId(profile, decodeEffect(fpte[2]));
    }

    return profile;
});
