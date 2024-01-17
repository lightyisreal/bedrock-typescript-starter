// Watch for changes in the source files and recompile them automatically.

import chokidar from 'chokidar';
import { exec } from 'child_process';
import { MinecraftServer } from './websocket';

// Watch for changes in the source files and recompile them automatically.
// To recompile, run `npm run build` in another terminal.

const toWatch = ['src/**/*.ts', 'lib/**/*.ts', 'lib/**/*.js', 'behavior_pack/functions/**/*.mcfunction'];

const watcher = chokidar.watch(toWatch, {
    ignored: /(^|[\/\\])\../,
    persistent: true,
});

const socket = new MinecraftServer(8080);

watcher.on('all', async (event) => {
    const eventsToCheck = ['add', 'change'];
    if (eventsToCheck.includes(event)) {
        exec('npx webpack', async (err) => {
            if (err) {
                console.error(err);
                return;
            }
            for (const client of socket.clients) {
                const { status, message } = await client.sendCommand("reload");
                if (status === 0) {
                    return;
                }
                client.sendMessage(
                    `Reload failed.\nError: ${message}`
                );
            }
        });
    }
});

console.log(`Watching for script and function changes...`);
console.log(`For automatic reloading, run the following command: "/wsserver ws://localhost:8080"`);