import { SlashCommandBuilder } from "discord.js";

export const ping = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with ready to start"),
  async execute(interaction: { reply: (arg0: string) => any }) {
    await interaction.reply(
      "Hi there! I am LinguaAI. To get started - use the `\text` command along with the text you would like to improve and the tone. Please choose tones from the following list: /n"
    );
  },
};
