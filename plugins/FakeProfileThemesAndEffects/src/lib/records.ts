import { findByName } from "@vendetta/metro";

export const ProfileEffectRecord: {
    new (props: { id: string; sku_id?: string | undefined; }): { id: string; sku_id: string | undefined; type: 1; };
    fromServer: (props: { id?: string | undefined; sku_id: string; }) => { id: string | undefined; sku_id: string; type: 1; };
} = findByName("ProfileEffectRecord");
