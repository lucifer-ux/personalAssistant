import { Bot, webhookCallback } from 'grammy';

const TELEGRAM_BOT_TOKEN = env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_WEBHOOK_SECRET = env.TELEGRAM_WEBHOOK_SECRET;

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const url = new URL(request.url);

		if (request.method !== 'POST' || url.pathname !== '/') {
			return new Response('Not Found', { status: 404 });
		}

		const secret = request.headers.get('X-Telegram-Bot-Api-Secret-Token');

		console.log(secret);
		if (secret !== TELEGRAM_WEBHOOK_SECRET) {
			return new Response('Unauthorized', { status: 401 });
		}

		const bot = new Bot(TELEGRAM_BOT_TOKEN);

		bot.on('message:text', async (ctx) => {
			console.log('Message:', ctx.message.text);
			console.log('User ID:', ctx.from?.id);
			console.log('Chat ID:', ctx.chat.id);

			await ctx.reply(`Received: ${ctx.message.text}`);
		});

		const handleUpdate = webhookCallback(bot, 'cloudflare-mod');

		return handleUpdate(request);
	},
};
