import * as server from '@minecraft/server';
import { isEnchanted } from 'utils/enchants';

server.world.afterEvents.worldInitialize.subscribe(() => {
    server.world.sendMessage(`Hello, if you're reading this, it means that the script compiled successfully!`);
    console.warn('Hey');
});

server.world.beforeEvents.itemUse.subscribe((event) => {
    if (isEnchanted(event.itemStack)) {
        event.source.sendMessage('Your item is enchanted!');
    } else {
        throw new Error('Your item is not enchanted!');
    }
});