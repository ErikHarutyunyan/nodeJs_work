import { Telegraf, session } from "telegraf";
import { initCommand, processTextToChat, INITIAL_SESSION } from "./logic.js";
import { message } from "telegraf/filters";
import { code } from "telegraf/format";
import { ogg } from "./ogg.js";
import { removeFile } from "./utils.js";
import { openai } from "./openai.js";
import http from "http";
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);

bot.use(session()); 
bot.command("new", initCommand);
bot.command("start", initCommand);
bot.launch();
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

bot.command('start', async (ctx) => {
  await ctx.reply(JSON.stringify(ctx.message, null,2))
})

bot.on(message("voice"), async (ctx) => {
  
  ctx.session = INITIAL_SESSION;
   try {
   await ctx.reply(
     code("Հաղորդագրությունը ստացել էմ: Սպասում է պատասխանին սերվերից...")
   );
   const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
   const userId = String(ctx.message.from.id);
   const oggPath = await ogg.create(link.href, userId);
   const mp3Path = await ogg.toMp3(oggPath, userId);
   
   removeFile(oggPath);
   const text = await openai.transcription(mp3Path);
  removeFile(mp3Path);
   await ctx.reply(code(`Ձեր հարցումը ${text}`));
   const messages = [{ role: openai.roles.USER, content: text }];
  //  const messages =  text;
   const response = await openai.chat(messages);
   await ctx.reply(response.content);
   removeFile(mp3Path);
   } catch (e) {
     console.log(`Error while voice message`, e.message);
   }
});

bot.on(message("text"), async (ctx) => {
  ctx.session = INITIAL_SESSION;
  try {
    await ctx.reply(code("Հաղորդագրությունը ստացել էմ: Սպասում է պատասխանին սերվերից..."));
    await processTextToChat(ctx, ctx.message.text);
  } catch (e) {
    console.log(`Error while voice message`, e.message);
  }
});

const PORT = process.env.PORT || 3001;
const server = http.createServer((req,res)=> {
  res.end("Hello bot")
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});