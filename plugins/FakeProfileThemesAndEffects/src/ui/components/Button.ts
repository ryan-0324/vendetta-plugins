import { Button as $Button } from "@vendetta/ui/components";
import type { ComponentType } from "react";
import type { PressableProps, TextProps } from "react-native";

import type { StringDict } from "@lib/utils";

export type ButtonLook = "filled" | "link" | "outlined";

export type ButtonColor = "brand" | "red" | "green" | "primary" | "transparent" | "grey" | "lightgrey" | "white" | "link";

export type ButtonSize = "xsmall" | "small" | "medium" | "large";

export interface ButtonProps extends Pick<PressableProps, "onPress" | "style"> {
    disabled?: boolean | undefined;
    text?: string | null | undefined;
    look?: ButtonLook | undefined;
    color?: ButtonColor | undefined;
    size?: ButtonSize | undefined;
    textStyle?: TextProps["style"];
}

export const Button: ComponentType<ButtonProps> & {
    Looks: StringDict<ButtonLook>;
    Colors: StringDict<ButtonColor>;
    Sizes: StringDict<ButtonSize>;
} = $Button as any;
