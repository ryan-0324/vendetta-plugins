import { findByStoreName } from "@vendetta/metro";

export interface User {
    avatar: string;
    avatarDecoration: { // Getter/Setter
        asset: string;
        skuId: string;
    } | null;
    avatarDecorationData: {
        asset: string;
        skuId: string;
    } | null;
    bot: boolean;
    clan: null; // TEMP
    readonly createdAt: Date; // Getter
    desktop: boolean;
    discriminator: string;
    email: string | null;
    flags: number;
    globalName: string | null;
    guildMemberAvatars: Record<string, string>;
    hasBouncedEmail: boolean;
    id: string;
    mfaEnabled: boolean;
    mobile: boolean;
    nsfwAllowed: boolean | null;
    personalConnectionId: string | null;
    phone: string | null;
    premiumType: number | null | undefined;
    premiumUsageFlags: number;
    publicFlags: number;
    purchasedFlags: number;
    system: boolean;
    username: string;
    verified: boolean;
    hasAnyStaffLevel: () => boolean;
    hasFlag: (flag: number) => boolean;
    isStaff: () => boolean;
    isStaffPersonal: () => boolean;
    // __proto__ methods
    addGuildAvatarHash: (guildId: string, avatarHash: string) => User;
    getAvatarSource: (guildId?: string | undefined, canAnimate?: boolean | undefined) => { uri: string; };
    getAvatarURL: (guildId?: string | undefined, avatarSize?: number | undefined, canAnimate?: boolean | undefined) => string;
    hasAvatarForGuild: (guildId?: string | undefined) => boolean;
    hasDisabledPremium: () => boolean;
    hasFreePremium: () => boolean;
    hasHadPremium: () => boolean;
    hasHadSKU: (skuId?: string | undefined) => boolean;
    hasPremiumUsageFlag: (flag?: number | undefined) => boolean;
    hasPurchasedFlag: (flag?: number | undefined) => boolean;
    hasUrgentMessages: () => boolean;
    hasVerifiedEmailOrPhone: () => boolean;
    isClaimed: () => boolean;
    isClyde: () => boolean;
    isLocalBot: () => boolean;
    isNonUserBot: () => boolean;
    isPhoneVerified: () => boolean;
    isPomelo: () => boolean;
    isSystemUser: () => boolean;
    isVerifiedBot: () => boolean;
    removeGuildAvatarHash: (guildId: string) => User;
    toString: () => string;
}

export const UserStore: {
    getUser: (userId: string | null | undefined) => User | undefined;
    getCurrentUser: () => User;
} = findByStoreName("UserStore");
