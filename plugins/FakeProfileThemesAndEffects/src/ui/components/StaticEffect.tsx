import type { ViewProps } from "react-native";

import { PROFILE_EFFECT_WH_RATIO, ProfileEffect, SAMPLE_PROFILE_SMALL } from "@lib/profileEffects";
import { Image, View } from "@ui/components";

export default ({ effect, style }: {
    effect: ProfileEffect;
    style?: ViewProps["style"];
}) => (
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
