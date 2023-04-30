import * as linguaCommand from "./commands/lingua";

export const commandsList = () => {
  const commands = [];
  commands.push(linguaCommand.data.toJSON());
  return commands;
};
