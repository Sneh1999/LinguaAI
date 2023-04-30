import { SlashCommandBuilder } from "discord.js";
import generateText from "../generateText";

const data = new SlashCommandBuilder()
  .setName("lingua")
  .setDescription(
    "This tool assists you in improving your English writing and phrasing skills."
  )
  .addStringOption((option) =>
    option
      .setName("tone")
      .setDescription("Choose tone")
      .setRequired(true)
      .addChoices(
        { name: "FORMAL", value: "formal" },
        { name: "INFORMAL", value: "informal" },
        { name: "OPTIMISTIC", value: "optimistic" },
        { name: "WORRIED", value: "worried" },
        { name: "FRIENDLY", value: "friendly" },
        { name: "CURIOUS", value: "curious" },
        { name: "ASSERTIVE", value: "assertive" },
        { name: "ENCOURAGING", value: "encouraging" },
        { name: "ENCOURAGING", value: "encouraging" },
        { name: "SUPRISED", value: "suprised" },
        { name: "COOPERATIVE", value: "cooperative" }
      )
  )
  .addStringOption((option) =>
    option
      .setName("text")
      .setDescription("The text you would like to improve")
      .setRequired(true)
  );

const execute = async (interaction: any) => {
  const tone = interaction.options.getString("tone");
  const text = interaction.options.getString("text");

  const generatedTextRes = await generateText(text, tone);
  if (generatedTextRes) {
    const generatedText = generatedTextRes.text;
    await interaction.reply(
      `Here is an improved version of the text you provided, in the tone you requested: ${generatedText}`
    );
  } else {
    await interaction.reply(`Sorry could not generate text`);
  }
};

export { data, execute };
