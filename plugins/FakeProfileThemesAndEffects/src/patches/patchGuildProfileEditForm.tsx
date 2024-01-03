import { findByName } from "@vendetta/metro";
import { after } from "@vendetta/patcher";
import { storage } from "@vendetta/plugin";

import { findParentInTree, getComponentNameFromType, isElement, RN } from "@lib/reactNativeRenderTree";
import type { Theme } from "@ui/color";
import Builder from "@ui/components/Builder";

const GuildProfileEditFormModule = findByName("GuildProfileEditForm", false);

export default () => after("default", GuildProfileEditFormModule, (_: any, tree: RN.Node) => {
    if (storage.hideBuilder) return tree;
    let guildId: string | undefined;
    const parent = findParentInTree(tree, children =>
        Array.isArray(children) && children.some(child => {
            if (isElement(child) && getComponentNameFromType(child.type) === "EditGuildIdentityBio") {
                guildId = (child.props as any).displayProfile?.guildId;
                return true;
            }
            return false;
        }));
    if (parent)
        (parent.props.children as RN.Node[]).splice(2, 0,
            <Builder
                theme={(parent.props as any).theme as Theme}
                guildId={guildId}
            />
        );
    return tree;
});
