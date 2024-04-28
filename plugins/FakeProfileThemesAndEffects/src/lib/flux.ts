import { FluxDispatcher as _FluxDispatcher } from "@vendetta/metro/common";

export const FluxDispatcher: {
    dispatch: (payload: {
        type?: string | undefined;
    }) => Promise<any>;
    subscribe: (type?: string | undefined, onDispatch?: (payload: any) => void) => void;
    unsubscribe: (type?: string | undefined, onDispatch?: (payload: any) => void) => void;
} = _FluxDispatcher as any;
