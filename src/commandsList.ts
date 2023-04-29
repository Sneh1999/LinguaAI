import * as pingCommand from "./commands/ping";

export const commandsList = () => {
  const commands = [];
  commands.push(pingCommand.data.toJSON());
  return commands;
};
