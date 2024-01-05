import { React } from "@vendetta/metro/common";
import { showToast } from "@vendetta/ui/toasts";

import FluxDispatcher from "@lib/FluxDispatcher";
import { buildFPTE } from "@lib/fpte";
import { ProfileEffect } from "@lib/profileEffects";
import UserStore from "@lib/stores/UserStore";
import { previewConfig } from "@patches/patchUseProfileThemeColors";
import { showColorPicker, showEffectPicker } from "@ui/actionSheets";
import { resolveSemanticColor, semanticColors, useAvatarColors, useThemeContext } from "@ui/color";
import { BuilderButton, Button, StaticEffect, View } from "@ui/components";
import { FormCardSection, FormSwitchRow } from "@ui/components/forms";
import { copyWithToast } from "@ui/toasts";

const { useEffect, useMemo, useState } = React;

function updatePreview() {
    FluxDispatcher.dispatch({ type: "USER_SETTINGS_ACCOUNT_SUBMIT_SUCCESS" });
}

export default ({ guildId }: { guildId?: string | undefined; }) => {
    const [primaryColor, setPrimaryColor] = useState(-1);
    const [accentColor, setAccentColor] = useState(-1);
    const [effect, setEffect] = useState<ProfileEffect | null>(null);
    const [showPreview, setShowPreview] = useState(true);
    const [buildLegacy, setBuildLegacy] = useState(false);

    const theme = useThemeContext().theme;
    const [fgColor, fillerColor] = useMemo(() => [
        resolveSemanticColor(theme, semanticColors.HEADER_SECONDARY),
        resolveSemanticColor(theme, semanticColors.BACKGROUND_ACCENT)
    ], [theme]);
    const avatarColors = useAvatarColors(UserStore.getCurrentUser().getAvatarURL(guildId, 80), fillerColor, false);

    useEffect(() => () => {
        previewConfig.primaryColor = -1;
        previewConfig.accentColor = -1;
        previewConfig.showPreview = true;
    }, []);

    return (
        <FormCardSection
            title="FPTE Builder"
            cardStyle={{ backgroundColor: "transparent" }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <BuilderButton
                    fgColor={fgColor}
                    label="Primary"
                    bgColor={primaryColor !== -1 ? primaryColor : undefined}
                    onPress={() => {
                        showColorPicker({
                            color: primaryColor !== -1 ? primaryColor : 0,
                            onSelect: color => {
                                setPrimaryColor(previewConfig.primaryColor = color);
                                if (showPreview) updatePreview();
                            },
                            suggestedColors: avatarColors
                        });
                    }}
                />
                <BuilderButton
                    fgColor={fgColor}
                    label="Accent"
                    bgColor={accentColor !== -1 ? accentColor : undefined}
                    onPress={() => {
                        showColorPicker({
                            color: accentColor !== -1 ? accentColor : 0,
                            onSelect: color => {
                                setAccentColor(previewConfig.accentColor = color);
                                if (showPreview) updatePreview();
                            },
                            suggestedColors: avatarColors
                        });
                    }}
                />
                <BuilderButton
                    fgColor={fgColor}
                    label="Effect"
                    onPress={() => showEffectPicker(effect => setEffect(effect), effect?.id)}
                >
                    {effect && (
                        <StaticEffect
                            effect={effect}
                            style={{
                                width: "100%",
                                height: "100%"
                            }}
                        />
                    )}
                </BuilderButton>
                <View
                    style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column"
                    }}
                >
                    <Button
                        text="Copy FPTE"
                        size={Button.Sizes.SMALL}
                        onPress={() => {
                            const strToCopy = buildFPTE(primaryColor, accentColor, effect?.id ?? "", buildLegacy);
                            if (!strToCopy)
                                showToast("FPTE Builder is empty; nothing to copy!");
                            else
                                copyWithToast(strToCopy, "FPTE copied to clipboard!");
                        }}
                    />
                    <Button
                        text="Reset"
                        look={Button.Looks.LINK}
                        color={Button.Colors.TRANSPARENT}
                        size={Button.Sizes.SMALL}
                        {...primaryColor === -1 && accentColor === -1 && !effect && {
                            pointerEvents: "none",
                            style: { opacity: 0 }
                        }}
                        onPress={() => {
                            setPrimaryColor(previewConfig.primaryColor = -1);
                            setAccentColor(previewConfig.accentColor = -1);
                            setEffect(null);
                            if (showPreview) updatePreview();
                        }}
                    />
                </View>
            </View>
            <FormSwitchRow
                label="FPTE Builder Preview"
                value={showPreview}
                onValueChange={value => {
                    setShowPreview(previewConfig.showPreview = value);
                    updatePreview();
                }}
            />
            <FormSwitchRow
                label="Build backwards compatible FPTE"
                subLabel="Will use more characters"
                value={buildLegacy}
                onValueChange={value => setBuildLegacy(value)}
            />
        </FormCardSection>
    );
};
