import { Client, Events, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import * as pingCommand from "./commands/ping";

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});
const token = process.env.DISCORD_BOT_TOKEN;
// start the bot
client.login(token);

// execute the command
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== "ping") {
    console.error("Unknown command");
  }

  try {
    await pingCommand.execute(interaction);
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
