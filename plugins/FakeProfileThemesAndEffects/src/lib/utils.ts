declare const emptyObjectSymbol: unique symbol;

export interface EmptyObject {
    [emptyObjectSymbol]?: never;
}

export type OmitCallSignature<T> = Pick<T, keyof T>;

export type StringDict<V extends string> = { [K in V as Uppercase<K>]: V };

export function isIterable<T extends object, V = any>(arg: T | Iterable<V>): arg is Iterable<V> {
    return typeof (arg as Iterable<V>)[Symbol.iterator] === "function";
}

export function isNonNullObject<T>(arg: T | T & object): arg is T & object {
    return arg !== null && typeof arg === "object";
}
