import { findByStoreName } from "@vendetta/metro";

export interface UserProfile {
    application: null; // TEMP
    accentColor: number | null;
    applicationRoleConnections: []; // TEMP
    badges: {
        description: string;
        icon: string;
        id: string;
        link?: string;
    }[];
    banner: string | null | undefined;
    bio: string;
    connectedAccounts: {
        id: string;
        metadata?: Record<string, any>;
        name: string;
        type: string;
        verified: boolean;
    }[];
    lastFetched: number;
    legacyUsername: string | null;
    popoutAnimationParticleType?: null | undefined; // Seems Discord has not implemented this yet
    premiumGuildSince: Date | null;
    premiumSince: Date | null;
    premiumType: number | null | undefined;
    profileEffectId?: string | undefined;
    profileEffectID?: string | undefined; // Backwards compatiblity
    profileFetchFailed: boolean;
    pronouns: string;
    themeColors?: [primaryColor: number, accentColor: number] | undefined;
    userId: string;
}

export const UserProfileStore: {
    getUserProfile: (userId: string) => UserProfile | undefined;
} = findByStoreName("UserProfileStore");
