import type React from "react";

import { isIterable, isNonNullObject, type OmitCallSignature } from "@lib/utils";

export namespace RN {
    export type Fragment<P extends object = object> = Element<P, symbol>;

    export interface ConsumerProps<T = unknown> {
        children: (value: T) => Node;
    }

    export interface ProviderProps<T = unknown> {
        value: T;
        children?: Node;
    }

    export type ConsumerType<T = unknown> = React.Context<T> & OmitCallSignature<React.NamedExoticComponent<ConsumerProps<T>>>;

    export interface ProviderType<T = unknown> extends OmitCallSignature<React.ProviderExoticComponent<ProviderProps<T>>> {
        _context: React.Context<T>;
    }

    export interface ForwardRefType<T = unknown, P extends object = object> extends OmitCallSignature<React.ForwardRefExoticComponent<P>> {
        render: React.ForwardRefRenderFunction<T, P>;
    }

    export interface MemoType<T extends ElementType<any> = ElementType> extends OmitCallSignature<React.NamedExoticComponent<ComponentPropsWithRef<T>>> {
        readonly type: T;
    }

    export interface Component<P, S> extends Omit<React.Component<P, S>, "render"> {
        render: () => Node;
    }

    export interface ComponentClass<P extends object = object, S = React.ComponentState> extends OmitCallSignature<React.ComponentClass<P, S>> {
        new (props: P, context?: any): Component<P, S>;
    }

    export interface FunctionComponent<P extends object = object> extends OmitCallSignature<React.FunctionComponent<P>> {
        (props: P, context?: any): Node;
    }

    export type ComponentType<P extends object = object> = ComponentClass<P> | FunctionComponent<P>;

    export type ElementType<P extends object = object> = ComponentType<P> | symbol | ConsumerType | ProviderType | ForwardRefType<unknown, P> | MemoType<ElementType<P>>;

    export interface Element<P extends object = object, T extends ElementType = ElementType> {
        type: T;
        props: P;
        key: React.Key | null;
    }

    export type Node = Iterable<Node> | Element | string | number | boolean | null | undefined;

    export type PropsWithChildren<P extends object = object> = P & { children: Node; };

    export type ComponentProps<T extends ElementType> = T extends ElementType<infer P> ? P : object;

    export type ComponentPropsWithRef<T extends ElementType> =
        T extends React.ComponentClass<infer P>
            ? React.PropsWithoutRef<P> & React.RefAttributes<InstanceType<T>>
            : React.PropsWithRef<ComponentProps<T>>;
}

export function isElement(arg: RN.Node): arg is RN.Element {
    return isNonNullObject(arg) && "type" in arg;
}

export function isElementWithChildren<T extends RN.Element>(arg: T | RN.Element<RN.PropsWithChildren>): arg is RN.Element<RN.PropsWithChildren> {
    return "children" in arg.props;
}

export function isProviderType(arg: Exclude<RN.ElementType, symbol>): arg is RN.ProviderType {
    return "_context" in arg;
}

export function isForwardRefType(arg: Exclude<RN.ElementType, symbol>): arg is RN.ForwardRefType {
    return "render" in arg;
}

export function isMemoType(arg: Exclude<RN.ElementType, symbol>): arg is RN.MemoType {
    return "type" in arg;
}

/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/** @see {@link https://github.com/facebook/react-native/blob/d724007364c4315e2cabace0fc6eae6e6212431d/packages/react-native/Libraries/Renderer/implementations/ReactNativeRenderer-dev.js#L3130-L3212} */
export function getComponentNameFromType(type: RN.ElementType) {
    if (typeof type === "symbol")
        return Symbol.keyFor(type) || null;
    if (typeof type === "function")
        return type.displayName || type.name || null;
    if (isProviderType(type))
        return type._context.displayName || null;
    if (type.displayName)
        return type.displayName;
    if (isForwardRefType(type))
        return type.render.displayName || type.render.name || null;
    if (isMemoType(type))
        return getComponentNameFromType(type.type);
    return null;
}
/* eslint-enable @typescript-eslint/prefer-nullish-coalescing */

export function findElementInTree<T extends RN.Element>(
    tree: RN.Node,
    filter: (element: RN.Element) => element is T,
    maxDepth?: number | undefined
): T | null;
export function findElementInTree(
    tree: RN.Node,
    filter: (element: RN.Element) => unknown,
    maxDepth?: number | undefined
): RN.Element | null;
export function findElementInTree(
    tree: RN.Node,
    filter: (element: RN.Element) => unknown,
    maxDepth = 200
): RN.Element | null {
    if (isNonNullObject(tree)) {
        if (isIterable(tree)) {
            if (maxDepth > 0) {
                for (const node of tree) {
                    const foundElement = findElementInTree(node, filter, maxDepth - 1);
                    if (foundElement) return foundElement;
                }
            }
        } else {
            if (filter(tree)) return tree;
            if (isElementWithChildren(tree))
                return findElementInTree(tree.props.children, filter, maxDepth - 1);
        }
    }
    return null;
}

export function findParentInTree<T extends RN.Node>(
    tree: RN.Node,
    filter: (children: RN.Node) => children is T,
    maxDepth?: number | undefined
): RN.Element<{ children: T; }> | null;
export function findParentInTree(
    tree: RN.Node,
    filter: (children: RN.Node) => unknown,
    maxDepth?: number | undefined
): RN.Element<RN.PropsWithChildren> | null;
export function findParentInTree(
    tree: RN.Node,
    filter: (children: RN.Node) => unknown,
    maxDepth = 200
): RN.Element<RN.PropsWithChildren> | null {
    if (isNonNullObject(tree)) {
        if (isIterable(tree)) {
            if (maxDepth > 0) {
                for (const node of tree) {
                    const foundParent = findParentInTree(node, filter, maxDepth - 1);
                    if (foundParent) return foundParent;
                }
            }
        } else if (isElementWithChildren(tree)) {
            if (filter(tree.props.children)) return tree;
            return findParentInTree(tree.props.children, filter, maxDepth - 1);
        }
    }
    return null;
}
