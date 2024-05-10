import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { useState } from "react";

import { FluxDispatcher } from "@lib/flux";
import type { ProfileEffect, User, UserProfile } from "@lib/stores";
import { getProfileTheme, type Theme } from "@ui/color";

function updatePreview() {
    FluxDispatcher.dispatch({ type: "USER_SETTINGS_ACCOUNT_SUBMIT_SUCCESS" });
}

let showPreview = true;
export function useShowPreview(initialState: typeof showPreview) {
    const [state, setState] = useState(() => showPreview = initialState);
    return [
        state,
        (preview: typeof showPreview) => {
            setState(showPreview = preview);
            updatePreview();
        }
    ] as const;
}

let primaryColor: number | null = null;
export function usePrimaryColor(initialState: typeof primaryColor) {
    const [state, setState] = useState(() => primaryColor = initialState);
    return [
        state,
        (color: typeof primaryColor) => {
            setState(primaryColor = color);
            if (showPreview) updatePreview();
        }
    ] as const;
}

let accentColor: number | null = null;
export function useAccentColor(initialState: typeof accentColor) {
    const [state, setState] = useState(() => accentColor = initialState);
    return [
        state,
        (color: typeof accentColor) => {
            setState(accentColor = color);
            if (showPreview) updatePreview();
        }
    ] as const;
}

let profileEffect: ProfileEffect["config"] | null = null;
export function useProfileEffect(initialState: typeof profileEffect) {
    const [state, setState] = useState(() => profileEffect = initialState);
    return [
        state,
        (effect: typeof profileEffect) => {
            setState(profileEffect = effect);
            if (showPreview) updatePreview();
        }
    ] as const;
}

export let previewUserId: string | undefined;

export function setPreviewUserId(userId: typeof previewUserId) {
    previewUserId = userId;
}

interface DisplayProfile extends Pick<UserProfile, "accentColor" | "banner" | "bio" | "popoutAnimationParticleType" | "profileEffectId" | "pronouns" | "themeColors" | "userId"> {
    _userProfile: UserProfile;
    _guildMemberProfile: UserProfile | null;
    guildId: string | undefined;
    // __proto__ properties
    readonly application: UserProfile["application"]; // Getter
    readonly canEditThemes: boolean; // Getter
    readonly canUsePremiumProfileCustomization: boolean; // Getter
    readonly premiumGuildSince: UserProfile["premiumGuildSince"]; // Getter
    readonly premiumSince: UserProfile["premiumSince"]; // Getter
    readonly premiumType: UserProfile["premiumType"]; // Getter
    readonly primaryColor: number | undefined; // Getter
    // __proto__ methods
    hasFullProfile: () => boolean;
    hasPremiumCustomization: () => boolean;
    hasThemeColors: () => boolean;
    isUsingGuildMemberBanner: () => boolean;
    isUsingGuildMemberBio: () => boolean;
    isUsingGuildMemberPronouns: () => boolean;
    getBadges: () => UserProfile["badges"];
    getBannerURL: (props: { canAnimate: boolean; size?: number; }) => string | undefined;
    getLegacyUsername: () => UserProfile["legacyUsername"];
    getPreviewBanner: (bannerURL: string | null | undefined, canAnimate: boolean, size?: number | undefined) => UserProfile["banner"];
    getPreviewBio: (bio: string | null | undefined) => {
        value: UserProfile["bio"];
        isUsingGuildValue: boolean;
    };
    getPreviewThemeColors: (pendingThemeColors?: UserProfile["themeColors"] | undefined) => Exclude<UserProfile["themeColors"], undefined>;
}

type useProfileThemeArgs = [
    props: {
        user?: User | null | undefined;
        displayProfile?: DisplayProfile | null | undefined;
        pendingThemeColors: UserProfile["themeColors"] | undefined;
        pendingAvatar?: User["avatar"] | null | undefined;
        isPreview?: boolean | null | undefined;
    }
];

interface useProfileThemeRet {
    theme: Theme;
    primaryColor: number | null;
    secondaryColor: number | null;
}

type useProfileThemeColorsArgs = [
    user: User | null | undefined,
    displayProfile: DisplayProfile | null | undefined,
    previewProps?: {
        pendingThemeColors: UserProfile["themeColors"] | undefined;
        pendingAvatar?: User["avatar"] | null | undefined;
        isPreview?: boolean;
    } | undefined
];

type useProfileThemeColorsRet = [number | null, number | null];

export const patchUseProfileTheme = (() => {
    let funcParent = findByName("useProfileTheme", false);
    if (funcParent)
        return () => after("default", funcParent, (([props]: useProfileThemeArgs, profileTheme: useProfileThemeRet) => {
            const { user } = props;
            if (
                (user != null && user.id === previewUserId
                || "pendingThemeColors" in props)
                && showPreview
            ) {
                if (primaryColor !== null) {
                    profileTheme.theme = getProfileTheme(primaryColor);
                    profileTheme.primaryColor = primaryColor;
                    profileTheme.secondaryColor = accentColor ?? primaryColor;
                } else if (accentColor !== null) {
                    profileTheme.theme = getProfileTheme(accentColor);
                    profileTheme.primaryColor = accentColor;
                    profileTheme.secondaryColor = accentColor;
                }
            }
            return profileTheme;
        }) as any);

    funcParent = findByName("useProfileThemeColors", false);
    if (funcParent)
        return () => after("default", funcParent, (([user, _displayProfile, previewProps]: useProfileThemeColorsArgs, origRet: useProfileThemeColorsRet) => {
            if (
                (user != null && user.id === previewUserId
                || previewProps)
                && showPreview
            ) {
                if (primaryColor !== null)
                    return [primaryColor, accentColor ?? primaryColor];
                if (accentColor !== null)
                    return [accentColor, accentColor];
            }
            return origRet;
        }) as any);

    return () => () => true;
})();
