import { ItemStack } from "@minecraft/server";

export function isEnchanted(itemStack: ItemStack): boolean {
    if (!itemStack) return false
    let component = itemStack.getComponent('enchantments')
    if (component && component.isValid()) {
        let length = 0
        for (let { } of component.enchantments) {
            length++
        }
        return length > 0
    }
    return false
}