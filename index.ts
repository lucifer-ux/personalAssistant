import { Bot } from "grammy";

const bot = new Bot("8455008214:AAE9spajZDqlPS6IOupTY0t2yyUMWWpxDKs");

bot.on("message", (ctx) => {
  const id = ctx.from;
  console.log(id, "idd");
  ctx.reply("we got your message");
});

bot.command("start", (ctx) =>
  ctx.reply("Welcome lucifer its a drag but lets start"),
);

bot.start();
