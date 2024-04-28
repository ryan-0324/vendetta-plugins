import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { useState } from "react";

import { FluxDispatcher } from "@lib/flux";
import type { ProfileEffect, User, UserProfile } from "@lib/stores";

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

type useProfileThemeColorsArgs = [
    user: User | null | undefined,
    displayProfile: DisplayProfile | null | undefined,
    previewProps?: {
        pendingThemeColors: UserProfile["themeColors"] | undefined;
        pendingAvatar?: User["avatar"] | null | undefined;
        isPreview?: boolean;
    } | undefined
];

// eslint-disable-next-line @typescript-eslint/no-empty-function
const funcParent = findByName("useProfileThemeColors", false) ?? { default() { } };

export const patchUseProfileThemeColors = () => after("default", funcParent, (args: any, origRet) => {
    const [user, _displayProfile, previewProps]: useProfileThemeColorsArgs = args;
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
});
