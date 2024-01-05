import { findByName, findByProps } from "@vendetta/metro";

export type RadiusKey = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "round";

export const Radius: Record<RadiusKey, number> = findByProps("Radius")?.Radius ?? {};

export type SpacingKey = "PX_4" | "PX_8" | "PX_12" | "PX_16" | "PX_24" | "PX_32" | "PX_40" | "PX_48" | "PX_56" | "PX_64" | "PX_72" | "PX_80" | "PX_96";

export const Spacing: Record<SpacingKey, number> = findByProps("Spacing")?.Spacing ?? {};

export const SafeAreaContext: React.Context<any> = findByProps("SafeAreaContext")?.SafeAreaContext;

export const useWindowDimensions: () => any = findByName("useWindowDimensions") ?? (() => {});
