# Minecraft Bedrock Edition TypeScript Add-on Template

This template is provided to help you get started making your own Bedrock Edition add-ons. It's packed with useful features and tools to help you succeed!\
Are you still a beginner? [Click here](https://github.com/imlighty/bedrock-addon-template) to get the JavaScript template instead.

## Features
- **Automatic script reloading** - This is achieved by using a WebSocket you can connect to once the watch server is started.
- **Code reliability** - Thanks to TypeScript, you'll get type errors and such before you even run the code.

## Setup and Usage

1. Download and install the latest version of [Visual Studio Code](https://code.visualstudio.com/), as well as the LTS version of [Node.js](https://nodejs.org/en/).
2. Create a new repo using this template and clone it locally.
3. Extract the template to a folder of your choice. Open the folder in Visual Studio Code and feel free to change both the `manifest.json` files in the `behavior_pack` and `resource_pack` folders located in the `src` folder to your liking. Change the `name` field in the `package.json` file: that will be the name used for the folder to copy things in.
4. Open a terminal in Visual Studio Code and run `npm i -D` to install all the dependencies, including the development dependencies.
5. Run `npm run watch` to start the WebSocket and watch for changes in the `src` folder. This will also automatically reload all the scripts when a change is detected.
6. Open Minecraft, create a new world with the add-on(s) installed and connect to the websocket using the command from the watch server (usually `/wsserver ws://localhost:3000`).
7. You're all set!