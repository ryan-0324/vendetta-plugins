import { storage } from "@vendetta/plugin";
import { useProxy } from "@vendetta/storage";
import { Forms, General } from "@vendetta/ui/components";

const { FormRadioRow, FormRow, FormSection } = Forms;
const { ScrollView } = General;

export default () => {
    useProxy(storage);
    
    return (
        <ScrollView>
            <FormSection title="Settings">
                <FormRow label="Source to use if profile theme colors / effects are set by both Nitro and About Me" />
                <FormRadioRow
                    label="Nitro"
                    onPress={() => { storage.prioritizeNitro = true }}
                    selected={!!storage.prioritizeNitro}
                />
                <FormRadioRow
                    label="About Me"
                    onPress={() => { storage.prioritizeNitro = false }}
                    selected={!storage.prioritizeNitro}
                />
            </FormSection>
        </ScrollView>
    );
};
