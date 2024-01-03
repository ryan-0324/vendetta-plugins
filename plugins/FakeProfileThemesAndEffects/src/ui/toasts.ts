import { clipboard } from "@vendetta/metro/common";
import { getAssetIDByName } from "@vendetta/ui/assets";
import { showToast } from "@vendetta/ui/toasts";

const TOAST_TYPE_COPY = getAssetIDByName("toast_copy_link");
const TOAST_TYPE_FAILURE = getAssetIDByName("Small");

export function copyWithToast(text: string, message: string) {
    clipboard.setString(text);
    showToast(message, TOAST_TYPE_COPY);
}

export function showErrorToast(message: string) {
    showToast(message, TOAST_TYPE_FAILURE);
}
