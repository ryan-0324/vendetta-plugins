import React from "react";

import { FluxDispatcher } from "@lib/flux";
import { type ProfileEffect, ProfileEffectStore, UserStore } from "@lib/stores";
import { setPreviewUserId } from "@patches/patchUseProfileThemeColors";
import { EffectPickerActionSheet, hideActionSheet, showActionSheet } from "@ui/actionSheets";

const SHEET_KEY = "__FPTE__";

export function showEffectPicker(onSelect: (effect: ProfileEffect["config"] | null) => void, currentEffectId?: string | undefined) {
    function onClose(payload: any) {
        if (payload.key === SHEET_KEY) {
            FluxDispatcher.unsubscribe("HIDE_ACTION_SHEET", onClose);
            setPreviewUserId(undefined);
        }
    }
    FluxDispatcher.subscribe("HIDE_ACTION_SHEET", onClose);

    showActionSheet({
        content: (
            <EffectPickerActionSheet
                effects={ProfileEffectStore.profileEffects}
                onSelect={effect => {
                    onSelect(effect);
                    hideActionSheet(SHEET_KEY);
                }}
                user={UserStore.getCurrentUser()}
                currentEffectId={currentEffectId}
            />
        ),
        key: SHEET_KEY
    });
}
