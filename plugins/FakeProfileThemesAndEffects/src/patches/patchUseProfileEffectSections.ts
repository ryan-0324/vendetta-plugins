import { findByPropsAll } from "@vendetta/metro";
import { after } from "@vendetta/patcher";

import { ProfileEffectRecord } from "@lib/records";
import { type ProfileEffect, ProfileEffectStore } from "@lib/stores";
import { previewUserId } from "@patches/patchUseProfileTheme";

const useSectionModules = findByPropsAll("NONE_ITEM");

let prevProfileEffects: ProfileEffect[];

let prevSections: any[];

export const patchUseProfileEffectSections = () => useSectionModules.map(sectionModule => after("default", sectionModule, (_args, origSections: any[]) => {
    if (previewUserId) {
        const currProfileEffects = ProfileEffectStore.profileEffects;
        if (prevProfileEffects !== currProfileEffects) {
            origSections.splice(1);
            origSections[0].items.splice(1);
            ProfileEffectStore.profileEffects.forEach(effect => {
                origSections[0].items.push(new ProfileEffectRecord(effect));
            });
            prevSections = origSections;
        } else
            origSections = prevSections;
    }
    return origSections;
}));
