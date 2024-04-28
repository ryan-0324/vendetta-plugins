import React from "react";
import { Image, View, type ViewProps } from "react-native";

import { type ProfileEffect } from "@lib/stores";
import { PROFILE_EFFECT_WH_RATIO, SAMPLE_PROFILE_SMALL } from "@ui/assets";

export interface StaticEffectProps {
    effect: ProfileEffect["config"];
    style?: ViewProps["style"];
}

export const StaticEffect = ({ effect, style }: StaticEffectProps) => (
    <View style={style}>
        <Image
            resizeMode="cover"
            source={SAMPLE_PROFILE_SMALL}
            style={{
                width: "100%",
                height: "100%"
            }}
        />
        <Image
            alt={effect.accessibilityLabel}
            resizeMethod="resize"
            resizeMode="cover"
            source={{ uri: effect.thumbnailPreviewSrc }}
            style={{
                position: "absolute",
                width: "100%",
                aspectRatio: PROFILE_EFFECT_WH_RATIO
            }}
        />
    </View>
);
