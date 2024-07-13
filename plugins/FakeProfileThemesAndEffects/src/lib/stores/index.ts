import type {
    UserProfileStore as $UserProfileStore,
    UserStore as $UserStore
} from "@vencord/discord-types";
import { findByStoreName } from "@vendetta/metro";

export * from "./CollectiblesPurchaseStore";
export * from "./ProfileEffectStore";

export const UserProfileStore: $UserProfileStore = findByStoreName("UserProfileStore");

export const UserStore: $UserStore = findByStoreName("UserStore");
