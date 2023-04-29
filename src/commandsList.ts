import { Collection } from "discord.js";
import path from "path";
import fs from "fs";

export const commandsList = () => {
  const commands = new Collection();

  const commandsPath = path.join(__dirname, "commands");
  const commandsFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".ts"));

  for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] the command at ${filePath} is missing the required functions`
      );
    }
  }

  return commands;
};
