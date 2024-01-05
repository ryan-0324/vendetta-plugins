import { lodash, React } from "@vendetta/metro/common";
import { getAssetIDByName } from "@vendetta/ui/assets";
import type { ViewStyle } from "react-native";

import { HapticFeebackTypes, triggerHapticFeedback } from "@lib/haptics";
import type { ProfileEffect } from "@lib/profileEffects";
import { ActionSheet, BottomSheetScrollView } from "@ui/actionSheets";
import type { EffectPickerActionSheetProps } from "@ui/actionSheets/EffectPickerActionSheet";
import { resolveSemanticColor, semanticColors, useThemeContext } from "@ui/color";
import { Button, FlashList, Icon, PressableOpacity, StaticEffect, Text, View } from "@ui/components";
import { Radius, SafeAreaContext, Spacing, useWindowDimensions } from "@ui/length";

const { useContext, useMemo, useState } = React;

const IMG_NONE = getAssetIDByName("img_none");
const ROW_SIZE = 3;

function Item({ label, isSelected, size, colors, onPress, style, children }: {
    label: string;
    isSelected: boolean;
    size: number;
    colors: string[];
    onPress: () => void;
    style?: ViewStyle | undefined;
    children: Exclude<React.ReactNode, number | string>;
}) {
    const [bgColor, itemColor, selectedColor] = colors;

    return (
        <PressableOpacity
            accessibilityLabel={label}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            disabled={isSelected}
            onPress={() => {
                triggerHapticFeedback(HapticFeebackTypes.IMPACT_LIGHT);
                onPress();
            }}
            style={[
                {
                    height: size,
                    width: size,
                    overflow: "hidden",
                    backgroundColor: itemColor,
                    borderColor: bgColor,
                    borderRadius: Radius.sm,
                    borderWidth: 2
                },
                isSelected && { borderColor: selectedColor },
                style
            ]}
        >
            {children}
        </PressableOpacity>
    );
}

export default (props: EffectPickerActionSheetProps) => {
    const [selectedId, setSelectedId] = useState(props.currentEffectId);
    const [itemSize, setItemSize] = useState(0);

    const theme = useThemeContext().theme;
    const colors = useMemo(() => [
        resolveSemanticColor(theme, semanticColors.BACKGROUND_PRIMARY),
        resolveSemanticColor(theme, semanticColors.BACKGROUND_FLOATING),
        resolveSemanticColor(theme, semanticColors.BUTTON_OUTLINE_BRAND_BORDER_ACTIVE)
    ], [theme]);

    const windowDimensions = useWindowDimensions();
    const safeArea = useContext(SafeAreaContext);

    const effects = useMemo(() => {
        const e: (ProfileEffect | null | undefined)[][] = lodash.chunk([null, ...props.effects], ROW_SIZE);
        const l = e[e.length - 1];
        while (l.length < 3) l.push(undefined);
        return e;
    }, [props.effects]);

    return (
        <ActionSheet
            transparentHeader={true}
            scrollable={true}
            startExpanded={true}
            contentHeight={windowDimensions.height - safeArea.top}
        >
            <BottomSheetScrollView>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        alignItems: "center",
                        paddingBottom: 88
                    }}
                >
                    <Text
                        variant={"redesign/heading-18/bold"}
                        color={"header-primary"}
                        style={{ margin: Spacing.PX_16 }}
                    >
                        {props.currentEffectId ? "Change Effect" : "Add Profile Effect"}
                    </Text>
                    <View
                        style={{
                            width: "72%",
                            minHeight: 38
                        }}
                    >
                        <Text
                            variant="heading-md/bold"
                            color="header-primary"
                            style={{ textAlign: "center" }}
                        >
                            {props.effects.find(e => e.id === selectedId)?.title ?? "None"}
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            width: "92%",
                            marginTop: 3
                        }}
                    >
                        <FlashList
                            accessibilityLabel="Profile Effect Selection Section"
                            numColumns={1}
                            estimatedItemSize={98}
                            ItemSeparatorComponent={() => <View style={{ height: Spacing.PX_16 }} />}
                            contentContainerStyle={{ paddingHorizontal: Spacing.PX_4 }}
                            data={effects}
                            extraData={selectedId}
                            renderItem={({ item }) => (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        paddingHorizontal: Spacing.PX_16
                                    }}
                                >
                                    {item.map(effect => effect ? (
                                        <Item
                                            label={effect.accessibilityLabel}
                                            isSelected={effect.id === selectedId}
                                            size={itemSize}
                                            colors={colors}
                                            onPress={() => setSelectedId(effect.id)}
                                        >
                                            <StaticEffect effect={effect} />
                                        </Item>
                                    ) : effect === null ? (
                                        <Item
                                            label="None"
                                            isSelected={!selectedId}
                                            size={itemSize}
                                            colors={colors}
                                            onPress={() => setSelectedId(undefined)}
                                            style={{
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                        >
                                            <Icon
                                                source={IMG_NONE}
                                                size={Icon.Sizes.LARGE}
                                            />
                                            <Text
                                                variant={"text-sm/medium"}
                                                color={"header-primary"}
                                                style={{ marginTop: Spacing.PX_4 }}
                                            >
                                                None
                                            </Text>
                                        </Item>
                                    ) : (
                                        <View
                                            style={{
                                                width: itemSize,
                                                height: itemSize
                                            }}
                                        />
                                    ))}
                                </View>
                            )}
                            onLayout={event => setItemSize((event.nativeEvent.layout.width - 64) / ROW_SIZE)}
                        />
                    </View>
                </View>
            </BottomSheetScrollView>
            <Button
                text="Apply"
                textStyle={{ fontSize: 16 }}
                onPress={() => props.onSelect(props.effects.find(e => e.id === selectedId) ?? null)}
                style={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    left: 0,
                    height: 48,
                    marginHorizontal: 36,
                    marginBottom: Spacing.PX_48,
                    borderRadius: Radius.round
                }}
            />
        </ActionSheet>
    );
};
