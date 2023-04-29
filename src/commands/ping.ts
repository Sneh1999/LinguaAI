import { SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with ready to start");

const execute = async (interaction: { reply: (arg0: string) => any }) => {
  await interaction.reply("Hi there! I am LinguaAI");
};

export { data, execute };
