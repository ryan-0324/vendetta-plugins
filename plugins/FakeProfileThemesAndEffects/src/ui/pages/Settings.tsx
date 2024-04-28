import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import React from "react";
import { ScrollView } from "react-native";

import { FormRadioRow, FormRow, FormSection, FormSwitchRow } from "@ui/components/forms";

export function Settings() {
    useProxy(storage);

    return (
        <ScrollView>
            <FormSection title="Settings">
                <FormRow label="Source to prioritize" />
                <FormRadioRow
                    label="Nitro"
                    selected={!!storage.prioritizeNitro}
                    onPress={() => { storage.prioritizeNitro = true; }}
                />
                <FormRadioRow
                    label="About Me"
                    selected={!storage.prioritizeNitro}
                    onPress={() => { storage.prioritizeNitro = false; }}
                />
                <FormSwitchRow
                    label="Hide Builder"
                    subLabel="Hide the FPTE Builder in the User Profile and Server Profiles settings pages"
                    value={!!storage.hideBuilder}
                    onValueChange={value => { storage.hideBuilder = value; }}
                />
                <FormSwitchRow
                    label="Force fallback effect picker"
                    value={!!storage.forceFallbackEffectPicker}
                    onValueChange={value => { storage.forceFallbackEffectPicker = value; }}
                />
            </FormSection>
        </ScrollView>
    );
}
