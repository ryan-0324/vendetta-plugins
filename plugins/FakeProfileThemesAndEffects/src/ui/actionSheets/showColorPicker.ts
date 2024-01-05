import { findByName } from "@vendetta/metro";

export default <(props: {
    color?: number | undefined;
    onSelect?: ((color: number) => void) | undefined;
    suggestedColors?: string[] | undefined;
}) => void>(findByName("showCustomColorPickerActionSheet") ?? (() => {}));
