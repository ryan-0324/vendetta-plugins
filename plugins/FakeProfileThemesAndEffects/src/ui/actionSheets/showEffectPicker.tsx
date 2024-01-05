import FluxDispatcher from "@lib/FluxDispatcher";
import { ProfileEffect, USER_PROFILE_EFFECTS_URL } from "@lib/profileEffects";
import RestAPI from "@lib/RestAPI";
import UserStore from "@lib/stores/UserStore";
import { hideActionSheet, showActionSheet } from "@ui/actionSheets";
import EffectPickerActionSheet from "@ui/actionSheets/EffectPickerActionSheet";
import { showErrorToast } from "@ui/toasts";

const SHEET_KEY = "__FPTE__";

export default (onSelect: (effect: ProfileEffect | null) => void, currentEffectId?: string | undefined) => {
    RestAPI.get({ url: USER_PROFILE_EFFECTS_URL })
        .then(res => {
            const effects: ProfileEffect[] = res.body.profile_effect_configs;
            if (!effects) return showErrorToast("Unable to fetch the list of profile effects from Discord's API.");

            const user = UserStore.getCurrentUser();
            const onClose = (payload: any) => {
                if (payload.key === SHEET_KEY) {
                    FluxDispatcher.unsubscribe("HIDE_ACTION_SHEET", onClose);
                    delete (user as any).__FPTE__;
                }
            };
            FluxDispatcher.subscribe("HIDE_ACTION_SHEET", onClose);

            showActionSheet({
                content: (
                    <EffectPickerActionSheet
                        effects={effects}
                        onSelect={effect => {
                            onSelect(effect);
                            hideActionSheet(SHEET_KEY);
                        }}
                        user={user}
                        currentEffectId={currentEffectId}
                    />
                ),
                key: SHEET_KEY
            });
        })
        .catch(e => {
            console.error(e);
            console.log(e.stack);
            showErrorToast("Unable to setup the effect picker.");
        });
};
