import { findByProps } from "@vendetta/metro";
import { semanticColors as _semanticColors } from "@vendetta/ui";

export type Theme = "dark" | "light" | "midnight" | "darker";

export interface ThemeContext {
    theme: Theme,
    primaryColor: number | null,
    secondaryColor: number | null,
    gradient: {
        id: number;
        theme: Theme;
        colors: {
            stop: number;
            token: string;
        }[];
        angle: number;
        midpointPercentage: number;
        getName: () => string;
    } | null,
    flags: number,
    key: string
}

export const semanticColors: Record<string, object> = _semanticColors;

export const resolveSemanticColor: (theme: Theme, semanticColor: object) => string
    = findByProps("colors", "meta")?.meta?.resolveSemanticColor ?? (() => {});

export const useAvatarColors: (avatarUrl: string, fillerColor: string, desaturateColors?: boolean | undefined) => string[]
    = findByProps("useAvatarColors")?.useAvatarColors ?? (() => {});

export const useThemeContext: () => ThemeContext
    = findByProps("useThemeContext")?.useThemeContext ?? (() => {});
