import { instead } from "@vendetta/patcher";

import { CollectiblesPurchaseStore } from "@lib/stores";
import { previewUserId } from "@patches/patchUseProfileTheme";

export const patchGetPurchase = () => instead(
    "getPurchase",
    CollectiblesPurchaseStore,
    (args: unknown[], origFunc: (...args: any[]) => unknown) => previewUserId
        ? { purchasedAt: new Date() }
        : origFunc(args)
);
