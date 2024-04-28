import Clipboard from "@react-native-clipboard/clipboard";
import { showToast } from "@vendetta/ui/toasts";

import { TOAST_TYPE_COPY, TOAST_TYPE_FAILURE } from "@ui/assets";

export function copyWithToast(text: string, message: string) {
    Clipboard.setString(text);
    showToast(message, TOAST_TYPE_COPY);
}

export function showErrorToast(message: string) {
    showToast(message, TOAST_TYPE_FAILURE);
}
