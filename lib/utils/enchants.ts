import { ItemStack } from "@minecraft/server";

export function isEnchanted(itemStack: ItemStack): boolean {
    if (!itemStack) return false;
    let component = itemStack.getComponent('enchantable');
    if (component && component.isValid()) {
        return component.getEnchantments().length > 0;
    }
    return false;
}