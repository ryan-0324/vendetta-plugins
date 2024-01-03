import { FluxDispatcher } from "@vendetta/metro/common";

export default <{
    dispatch: (payload: {
        type?: string | undefined;
    }) => Promise<any>;
    subscribe: (type?: string | undefined, onDispatch?: (payload: any) => void) => void;
    unsubscribe: (type?: string | undefined, onDispatch?: (payload: any) => void) => void;
}><any>FluxDispatcher;
