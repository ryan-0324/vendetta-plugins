import { Forms } from "@vendetta/ui/components";
import type { ColorValue, PressableProps, ViewProps } from "react-native";

import type { TextProps } from "@ui/components/Text";

interface CardProps {
    start?: boolean | undefined;
    end?: boolean | undefined;
    shadow?: string | undefined;
    border?: string | undefined;
    variant?: string | undefined;
}

export interface ViewCardProps extends CardProps, ViewProps { }

export interface PressableCardProps extends CardProps, PressableProps { }

interface TableRowProps {
    label?: React.ReactNode;
    subLabel?: React.ReactNode;
    icon?: React.ReactNode;
    trailing?: React.ReactNode;
    arrow?: boolean | undefined;
    labelLineClamp?: TextProps["lineClamp"];
    subLabelLineClamp?: TextProps["lineClamp"];
}

export interface ViewTableRowProps extends TableRowProps, ViewCardProps { }

export interface PressableTableRowProps extends TableRowProps, PressableCardProps { }

export interface FormTitleProps {
    title: string;
    icon?: ViewProps["children"];
    textStyle?: TextProps["style"];
    viewStyle?: ViewProps["style"];
    numberOfLines: TextProps["numberOfLines"];
    inset?: boolean | undefined;
    thinTitle?: boolean | undefined;
    uppercaseTitle?: boolean | undefined;
    error?: boolean | undefined;
}

export type TitleStyleType = "default" | "no_border" | "no_border_or_margin";

export interface FormSection extends Omit<FormTitleProps, "numberOfLines" | "textStyle" | "viewStyle">, Pick<ViewProps, "accessibilityLabel" | "accessibilityRole" | "children"> {
    description?: ViewProps["children"];
    hint?: ViewProps["children"];
    titleStyleType?: TitleStyleType | undefined;
    titleTextStyle?: FormTitleProps["textStyle"];
    titleViewStyle?: FormTitleProps["viewStyle"];
    sectionBodyStyle?: ViewProps["style"];
    hasIcons?: boolean | undefined;
}

export interface FormLabelProps extends Pick<TextProps, "accessible" | "color" | "numberOfLines" | "style"> {
    text?: TextProps["children"];
}

export interface FormRowProps extends Pick<ViewProps, "style">,
    Pick<PressableTableRowProps,
        "accessibilityActions" | "accessibilityHint" | "accessibilityLabel" | "accessibilityRole" | "accessibilityState" | "accessible" | "delayLongPress" | "disabled"
        | "end" | "label" | "onAccessibilityAction" | "onAccessibilityTap" | "onLongPress" | "onPress" | "onPressOut" | "start" | "subLabel" | "trailing" | "variant"> {
    leading?: TableRowProps["icon"];
    leadingStyle?: ViewProps["style"];
    trailingWrapperStyle?: ViewProps["style"];
    DEPRECATED_style?: ViewProps["style"];
    numberOfLines?: TableRowProps["labelLineClamp"];
    activeOpacity?: number | undefined;
    hasError?: boolean | undefined;
}

export interface FormRadioProps {
    selected?: boolean | undefined;
}

export interface FormRadioRowProps extends FormRadioProps, FormRowProps {
    align?: "left" | "right";
    value?: boolean | undefined;
}

export interface FormSwitchProps extends Pick<PressableProps, "accessible" | "accessibilityHint" | "accessibilityLabel" | "disabled" | "style"> {
    value?: boolean | undefined;
    onValueChange?: ((value: boolean) => void) | undefined;
    borderColor?: ColorValue | undefined;
    tintColor?: ColorValue | undefined;
    renderIosBackground?: boolean | undefined;
}

export interface FormSwitchRowProps extends Pick<FormLabelProps, "numberOfLines">, Pick<FormSwitchProps, "disabled" | "onValueChange" | "value">, ViewTableRowProps {
    switchProps?: FormSwitchProps | undefined;
}

export interface FormCardSectionProps extends Pick<ViewProps, "accessibilityLabel" | "accessibilityRole" | "children" | "style"> {
    title?: React.ReactNode;
    headerComponent?: React.ReactNode;
    titleStyle?: TextProps["style"];
    cardStyle?: ViewProps["style"];
}

export const FormSection: React.ComponentType<FormSection> = Forms.FormSection;

export const FormRow: React.ComponentType<FormRowProps> = Forms.FormRow;

export const FormRadioRow: React.ComponentType<FormRadioRowProps> = Forms.FormRadioRow;

export const FormSwitchRow: React.ComponentType<FormSwitchRowProps> = Forms.FormSwitchRow;

export const FormCardSection: React.ComponentType<FormCardSectionProps> = Forms.FormCardSection;
