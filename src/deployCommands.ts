import fs from "fs";
import { REST, Routes } from "discord.js";
import { commandsList } from "./commandsList";
import dotenv from "dotenv";

dotenv.config();

export const deployCommands = async () => {
  const commands = commandsList();
  const token = process.env.DISCORD_BOT_TOKEN;
  const rest = new REST().setToken(token);

  console.log({ commands });

  try {
    console.log(`Starting to redeploy`);
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log(`Successfully reloaded`);
  } catch (error: any) {
    console.error(JSON.stringify(error, null, 2));
  }
};

deployCommands()
  .then(() => process.exit(0))
  .catch((err) => console.error(err));
