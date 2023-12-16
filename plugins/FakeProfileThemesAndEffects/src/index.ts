import { findByStoreName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";

import Settings from "./Settings";

interface UserProfile {
    bio: string;
    premiumType: number | null;
    profileEffectId: string | undefined; // Discord will soon switch from ID to Id
    profileEffectID: string | undefined;
    themeColors: [number, number] | undefined;
}

/**
 * Extracts profile theme colors from given legacy-format string
 * @param str The legacy-format string to extract profile theme colors from
 * @returns The profile theme colors. Colors will be -1 if not found.
 */
function decodeColorsLegacy(str: string): [number, number] {
    const colors = str.matchAll(/(?<=#)[\dA-Fa-f]{1,6}/g);
    return [parseInt(colors.next().value?.[0], 16) || -1, parseInt(colors.next().value?.[0], 16) || -1];
}

/**
 * Converts the given no-offset base-4096 string to a base-10 24-bit color
 * @param str The no-offset base-4096 string to be converted
 * @returns The converted base-10 24-bit color
 *          Will be -1 if the given string is empty and -2 if greater than the maximum 24-bit color, 16,777,215
 */
function decodeColor(str: string) {
    if (str === "") return -1;
    let color = 0;
    for (let i = 0; i < str.length; i++) {
        if (color > 16_777_215) return -2;
        color += str.codePointAt(i)! * 4096 ** (str.length - 1 - i);
    }
    return color;
}

/**
 * Converts the given no-offset base-4096 string to a base-10 profile effect ID
 * @param str The no-offset base-4096 string to be converted
 * @returns The converted base-10 profile effect ID
 *          Will be -1n if the given string is empty and -2n if greater than the maximum profile effect ID, 1.2 quintillion
 */
function decodeEffect(str: string) {
    if (str === "") return -1n;
    let id = 0n;
    for (let i = 0; i < str.length; i++) {
        if (id > 1_200_000_000_000_000_000n) return -2n;
        id += BigInt(str.codePointAt(i)!) * 4096n ** BigInt(str.length - 1 - i);
    }
    return id;
}

/**
 * Extracts the delimiter-separated values of the first FPTE string found in the given string
 * @param str The string to be searched for a FPTE string
 * @returns An array of the extracted FPTE string's values. Values will be empty if not found.
 */
function extractFPTE(str: string) {
    const fpte: [string, string, string] = ["", "", ""]; // The array containing extracted FPTE values
    let i = 0; // The current index of fpte getting extracted

    for (const char of str) {
        const cp = char.codePointAt(0)!; // The current character's code point

        // If the current character is a delimiter, then the current index of fpte has been completed.
        if (cp === 0x200B) {
            // If the current index of fpte is the last, then the extraction is done.
            if (i >= 2) break;
            i++; // Start extracting the next index of fpte
        }
        // If the current character is not a delimiter but a valid FPTE
        // character, it will be added to the current index of fpte.
        else if (cp >= 0xE0000 && cp <= 0xE0FFF)
            fpte[i] += String.fromCodePoint(cp - 0xE0000);
        // If an FPTE string has been found and its end has been reached, then the extraction is done.
        else if (i > 0 || fpte[0] !== "") break;
    }

    return fpte;
}

function updateUserThemeColors(user: UserProfile, primary: number, accent: number) {
    if (primary > -1) {
        user.themeColors = [primary, accent > -1 ? accent : primary];
        user.premiumType = 2;
    } else if (accent > -1) {
        user.themeColors = [accent, accent];
        user.premiumType = 2;
    }
}

function updateUserEffectId(user: UserProfile, id: bigint) {
    if (id > -1n) {
        user.profileEffectId = id.toString();
        user.profileEffectID = id.toString();
        user.premiumType = 2;
    }
}

const patches: (() => boolean)[] = [];

const UserProfileStore = findByStoreName("UserProfileStore");

export default {
    onLoad: () => {
        patches.push(after("getUserProfile", UserProfileStore, (_, user: UserProfile | undefined) => {
            if (user === undefined) return user;

            if (storage.prioritizeNitro) {
                if (user.themeColors !== undefined) {
                    if (user.profileEffectId === undefined && user.profileEffectID === undefined) {
                        const fpte = extractFPTE(user.bio);
                        if (decodeColor(fpte[0]) === -2)
                            updateUserEffectId(user, decodeEffect(fpte[1]));
                        else
                            updateUserEffectId(user, decodeEffect(fpte[2]));
                    }
                    return user;
                } else if (user.profileEffectId !== undefined || user.profileEffectID !== undefined) {
                    const fpte = extractFPTE(user.bio);
                    const primaryColor = decodeColor(fpte[0]);
                    if (primaryColor === -2)
                        updateUserThemeColors(user, ...decodeColorsLegacy(fpte[0]));
                    else
                        updateUserThemeColors(user, primaryColor, decodeColor(fpte[1]));
                    return user;
                }
            }
    
            const fpte = extractFPTE(user.bio);
            const primaryColor = decodeColor(fpte[0]);
            if (primaryColor === -2) {
                updateUserThemeColors(user, ...decodeColorsLegacy(fpte[0]));
                updateUserEffectId(user, decodeEffect(fpte[1]));
            } else {
                updateUserThemeColors(user, primaryColor, decodeColor(fpte[1]));
                updateUserEffectId(user, decodeEffect(fpte[2]));
            }
            return user;
        }));
    },
    onUnload: () => {
        patches.forEach(p => { p(); });
    },
    settings: Settings
}
