import type { ColorValue } from "react-native";

import { Path, PressableOpacity, Svg, Text, View } from "@ui/components";
import { Radius, Spacing } from "@ui/length";

export default ({ label, fgColor, bgColor, onPress, children }: {
    label?: string | undefined;
    fgColor: ColorValue;
    bgColor?: number | undefined;
    onPress?: (() => void) | undefined;
    children?: Exclude<React.ReactNode, number | string>;
}) => {
    return (
        <View style={{ width: 50 }}>
            <PressableOpacity
                accessibilityLabel={label}
                accessibilityRole="button"
                onPress={onPress}
                style={[
                    {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 50,
                        overflow: "hidden",
                        borderColor: fgColor,
                        borderStyle: "dashed",
                        borderWidth: 2,
                        borderRadius: Radius.xs
                    },
                    bgColor != null && {
                        backgroundColor: "#" + bgColor.toString(16).padStart(6, "0"),
                        borderStyle: "solid"
                    },
                    !!children && { borderWidth: 0 }
                ]}
            >
                {children || (
                    <Svg
                        fill={fgColor}
                        width="40%"
                        height="40%"
                        viewBox="0 0 144 144"
                    >
                        <Path d="M144 64H80V0H64v64H0v16h64v64h16V80h64Z" />
                    </Svg>
                )}
            </PressableOpacity>
            {!!label && (
                <Text
                    variant="text-sm/normal"
                    style={{
                        marginTop: Spacing.PX_4,
                        textAlign: "center"
                    }}
                >
                    {label}
                </Text>
            )}
        </View>
    );
};
