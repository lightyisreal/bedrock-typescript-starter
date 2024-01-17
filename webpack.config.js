const path = require("path");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { name } = require("./package.json");
const os = require("os");

const mainFile = "main.js";
const useMinecraftPreview = false;

function getMinecraftPath() {
    if (process.platform !== "win32")
        throw new Error("Only Windows is supported for now.");
    let path =
        os.homedir() +
        (useMinecraftPreview
            ? "/AppData/Local/Packages/Microsoft.MinecraftWindowsBeta_8wekyb3d8bbwe/LocalState/games/com.mojang/"
            : "/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/");
    return path;
}

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
    entry: "./src/main.ts",
    devtool: "source-map",
    mode: "production",
    target: ["es2020"],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        plugins: [new TsconfigPathsPlugin()],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "behavior_pack"),
                    to: path.join(
                        getMinecraftPath(),
                        "development_behavior_packs",
                        name
                    ),
                },
                {
                    from: "resource_pack",
                    to: path.join(
                        getMinecraftPath(),
                        "development_resource_packs",
                        name
                    ),
                },
            ],
        }),
    ],
    optimization: {
        minimize: false,
    },
    output: {
        filename: mainFile,
        path: path.join(
            getMinecraftPath(),
            "development_behavior_packs",
            name,
            "scripts"
        ),
        library: {
            type: "module",
        },
    },
    experiments: {
        outputModule: true,
    },
    externalsType: "module",
    externals: {
        "@minecraft/server": "@minecraft/server",
        "@minecraft/server-ui": "@minecraft/server-ui",
        "@minecraft/server-net": "@minecraft/server-net",
        "@minecraft/server-admin": "@minecraft/server-admin",
        "@minecraft/server-editor": "@minecraft/server-editor",
        "@minecraft/server-gametest": "@minecraft/server-gametest",
        "@minecraft/server-editor-bindings": "@minecraft/server-editor-bindings",
    },
};