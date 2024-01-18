// Watch for changes in the source files and recompile them automatically.

import { MinecraftServer } from './websocket';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';

// Watch for changes in the source files and recompile them automatically.
// To recompile, run `npm run build` in another terminal.

const toWatch = ['src/**/*.ts', 'lib/**/*.ts', 'lib/**/*.js', 'behavior_pack/functions/**/*.mcfunction'];

const socket = new MinecraftServer(8080);

const compiler = webpack(webpackConfig({}, { mode: "development" }));

compiler.watch({}, async (err, stats) => {
    if (err) {
        console.error(err);
        return;
    }
    if (stats && stats.hasErrors()) {
        console.error(stats.toString());
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

console.log(`Watching for script and function changes...`);
console.log(`For automatic reloading, run the following command: "/wsserver ws://localhost:8080"`);