import { FluxDispatcher as _FluxDispatcher } from "@vendetta/metro/common";

export const FluxDispatcher: {
    dispatch: (payload: { type?: string | undefined; } & Record<PropertyKey, any>) => Promise<any>;
    subscribe: (type?: string | undefined, onDispatch?: ((payload: any) => void) | undefined) => void;
    unsubscribe: (type?: string | undefined, onDispatch?: ((payload: any) => void) | undefined) => void;
} = _FluxDispatcher as any;
