import type { ColorValue } from "react-native";

import { Path, PressableOpacity, Svg, Text, View } from "@ui/components";

export default ({ fgColor, label, bgColor, children, onPress }: {
    fgColor: ColorValue;
    label?: string | undefined;
    bgColor?: number | undefined;
    children?: React.ReactNode;
    onPress?: (() => void) | undefined;
}) => {
    return (
        <View style={{ width: 50 }}>
            <PressableOpacity
                accessibilityLabel={label}
                accessibilityRole="button"
                onPress={onPress}
                {...children && {
                    style: {
                        height: 50,
                        overflow: "hidden",
                        borderRadius: 4
                    },
                    children: children
                } || bgColor !== undefined && {
                    style: {
                        height: 50,
                        backgroundColor: "#" + bgColor.toString(16).padStart(6, "0"),
                        borderColor: fgColor,
                        borderStyle: "solid",
                        borderWidth: 2,
                        borderRadius: 4
                    }
                } || {
                    style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 50,
                        borderColor: fgColor,
                        borderStyle: "dashed",
                        borderWidth: 2,
                        borderRadius: 4
                    },
                    children: (
                        <Svg
                            fill={fgColor}
                            width="40%"
                            height="40%"
                            viewBox="0 0 144 144"
                        >
                            <Path d="M144 64H80V0H64v64H0v16h64v64h16V80h64Z" />
                        </Svg>
                    )
                }}
            />
            {!!label && (
                <Text
                    variant="text-sm/normal"
                    style={{
                        marginTop: 4,
                        textAlign: "center"
                    }}
                >
                    {label}
                </Text>
            )}
        </View>
    );
};
