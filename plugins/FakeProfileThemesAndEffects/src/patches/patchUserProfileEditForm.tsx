import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";

import { findParentInTree, getComponentNameFromType, isElement, RN } from "@lib/reactNativeRenderTree";
import type { Theme } from "@ui/color";
import Builder from "@ui/components/Builder";

const UserProfileEditFormModule = findByName("UserProfileEditForm", false);

export default () => after("default", UserProfileEditFormModule, (_: any, tree: RN.Node) => {
    if (storage.hideBuilder) return tree;
    const parent = findParentInTree(tree, children =>
        Array.isArray(children) && children.some(child =>
            isElement(child) && getComponentNameFromType(child.type) === "EditUserProfileBio"));
    if (parent)
        (parent.props.children as RN.Node[]).splice(2, 0,
            <Builder theme={(parent.props as any).theme as Theme} />);
    return tree;
});
