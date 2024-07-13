import { findByName, findByProps } from "@vendetta/metro";
import type { Context } from "react";

export type RadiusKey = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "round";

export const Radius: Record<RadiusKey, number>
    = (findByProps("Radius") as Record<string, any> | undefined)?.Radius ?? {};

export type SpacingKey = "PX_4" | "PX_8" | "PX_12" | "PX_16" | "PX_24" | "PX_32" | "PX_40" | "PX_48" | "PX_56" | "PX_64" | "PX_72" | "PX_80" | "PX_96";

export const Spacing: Record<SpacingKey, number>
    = (findByProps("Spacing") as Record<string, any> | undefined)?.Spacing ?? {};

export const SafeAreaContext: Context<any>
    = (findByProps("SafeAreaContext") as Record<string, any> | undefined)?.SafeAreaContext;

export const useWindowDimensions: () => any
    = findByName("useWindowDimensions") ?? (() => undefined);
