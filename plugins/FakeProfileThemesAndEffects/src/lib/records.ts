import type { ImmutableRecord } from "@vencord/discord-types";
import { findByName } from "@vendetta/metro";

export const ProfileEffectRecord: typeof $ProfileEffectRecord = findByName("ProfileEffectRecord");

export type ProfileEffectRecordOwnProperties = Pick<$ProfileEffectRecord, "id" | "skuId" | "type">;

export type ProfileEffectProperties = Omit<ProfileEffectRecordOwnProperties, "type">;

declare class $ProfileEffectRecord extends ImmutableRecord<ProfileEffectRecordOwnProperties> {
    constructor(profileEffectProperties: ProfileEffectProperties);

    static fromServer(profileEffectFromServer: { id: string; sku_id: string; }): $ProfileEffectRecord;

    id: string;
    skuId: string;
    type: CollectiblesItemType.PROFILE_EFFECT;
}

export const enum CollectiblesItemType {
    AVATAR_DECORATION = 0,
    PROFILE_EFFECT = 1,
    NONE = 100,
    BUNDLE = 1_000,
}
