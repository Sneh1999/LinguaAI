import { Collection, CommandInteraction } from "discord.js";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { commandsList } from "./commandsList";

const startDiscordBot = () => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
  });
  const token = process.env.token;
  // start the bot
  client.login(token);

  // get the commands list
  const commands = commandsList();

  // execute the command
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);
    const command: any = commands.get(interaction.commandName);
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
    }

    try {
      await command.execute(interaction);
    } catch (error: any) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  });
};
