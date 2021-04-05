const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client({
  partials: ["MESSAGE", "REACTION", "CHANNEL"],
});

client.on("ready", () => {
  console.log("Bot is ready");
});

client.on("message", (msg) => {
  if (msg.content === "Hello") msg.reply("Hi");
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  if (reaction.message.author.bot) return;

  if (reaction.emoji.name === "🤨") {
    const question = reaction.message.content;
    console.log(question);
    const urlEncoded = encodeURI(question);
    reaction.message.reply(
      `Have you already tried some steps to resolve the issue?
In many cases, a simple google search, such as the following, can resolve your issue:

https://www.google.com/search?q=${urlEncoded}

If that doesn't help, please specify where you're stuck.
`


    );
  }
});

client.login(process.env.BOT_TOKEN);
