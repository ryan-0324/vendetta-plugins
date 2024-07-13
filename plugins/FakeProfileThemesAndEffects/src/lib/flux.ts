import type { FluxDispatcher as $FluxDispatcher } from "@vencord/discord-types";
import { FluxDispatcher as Dispatcher } from "@vendetta/metro/common";

export const FluxDispatcher = Dispatcher as $FluxDispatcher;
