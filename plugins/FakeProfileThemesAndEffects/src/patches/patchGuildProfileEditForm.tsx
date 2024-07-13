import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";
import React from "react";

import { findParentInTree, getComponentNameFromType, isElement, type RN } from "@lib/reactNativeRenderTree";
import { Builder } from "@ui/components";

const funcParent = findByName("GuildProfileEditForm", false);

export const patchGuildProfileEditForm = () => after("default", funcParent, (_args: unknown[], tree: RN.Node) => {
    if (storage.hideBuilder) return tree;

    let guildId: string | undefined;
    const parent = findParentInTree(tree, (children): children is RN.Node[] =>
        Array.isArray(children) && children.some(child => {
            if (isElement(child) && getComponentNameFromType(child.type) === "EditGuildIdentityBio") {
                guildId = (child.props as any).displayProfile?.guildId;
                return true;
            }
            return false;
        }));
    if (parent)
        parent.props.children.splice(2, 0, <Builder guildId={guildId} />);

    return tree;
});
