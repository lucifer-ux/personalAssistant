import { Bot, webhookCallback } from "grammy";

const bot = new Bot("8455008214:AAE9spajZDqlPS6IOupTY0t2yyUMWWpxDKs");

bot.on("message:text", async (ctx) => {
  await ctx.reply(`Recieved: ${ctx.message.text}`);
});

export default {
  async fetch(request: Request): Promise<Response> {
    return webhookCallback(bot, "cloudflare-mod")(request);
  },
};
