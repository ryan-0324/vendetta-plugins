import { showToast } from "@vendetta/ui/toasts";
import React, { useMemo, useState } from "react";
import { View } from "react-native";

import { buildFPTE } from "@lib/fpte";
import { type ProfileEffect, UserStore } from "@lib/stores";
import { useAccentColor, usePrimaryColor, useShowPreview } from "@patches/patchUseProfileThemeColors";
import { showColorPicker, showEffectPicker } from "@ui/actionSheets";
import { resolveSemanticColor, semanticColors, useAvatarColors, useThemeContext } from "@ui/color";
import { BuilderButton, Button, StaticEffect } from "@ui/components";
import { FormCardSection, FormSwitchRow } from "@ui/components/forms";
import { copyWithToast } from "@ui/toasts";

export interface BuilderProps {
    guildId?: string | undefined;
}

export function Builder({ guildId }: BuilderProps) {
    const [primaryColor, setPrimaryColor] = usePrimaryColor(null);
    const [accentColor, setAccentColor] = useAccentColor(null);
    const [effect, setEffect] = useState<ProfileEffect["config"] | null>(null);
    const [preview, setPreview] = useShowPreview(true);
    const [buildLegacy, setBuildLegacy] = useState(false);

    const { theme } = useThemeContext();
    const [fgColor, fillerColor] = useMemo(() => [
        resolveSemanticColor(theme, semanticColors.HEADER_SECONDARY),
        resolveSemanticColor(theme, semanticColors.BACKGROUND_ACCENT)
    ], [theme]);
    const avatarColors = useAvatarColors(UserStore.getCurrentUser().getAvatarURL(guildId, 80), fillerColor, false);

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
                    bgColor={primaryColor}
                    onPress={() => {
                        showColorPicker({
                            color: primaryColor,
                            onSelect: setPrimaryColor,
                            suggestedColors: avatarColors
                        });
                    }}
                />
                <BuilderButton
                    fgColor={fgColor}
                    label="Accent"
                    bgColor={accentColor}
                    onPress={() => {
                        showColorPicker({
                            color: accentColor,
                            onSelect: setAccentColor,
                            suggestedColors: avatarColors
                        });
                    }}
                />
                <BuilderButton
                    fgColor={fgColor}
                    label="Effect"
                    onPress={() => { showEffectPicker(setEffect, effect?.id); }}
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
                            const strToCopy = buildFPTE(primaryColor ?? -1, accentColor ?? -1, effect?.id ?? "", buildLegacy);
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
                        {...primaryColor === null && accentColor === null && !effect && {
                            pointerEvents: "none",
                            style: { opacity: 0 }
                        }}
                        onPress={() => {
                            setPrimaryColor(null);
                            setAccentColor(null);
                            setEffect(null);
                        }}
                    />
                </View>
            </View>
            <FormSwitchRow
                label="FPTE Builder Preview"
                value={preview}
                onValueChange={setPreview}
            />
            <FormSwitchRow
                label="Build backwards compatible FPTE"
                subLabel="Will use more characters"
                value={buildLegacy}
                onValueChange={setBuildLegacy}
            />
        </FormCardSection>
    );
}
