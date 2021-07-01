// Getting Discord.js and Cron
const Discord = require("discord.js");
const cron = require("cron");
const conf = require('./env.json')
// Creating a discord client
const client = new Discord.Client();
// We need to run it just one time and when the client is ready
// Because then it will get undefined if the client isn't ready
client.once("ready", () => {
  console.log("Bot Start")
  const guild = client.guilds.cache.get(conf.guildId);
  const channel = guild.channels.cache.get(conf.channel);
  let target;
  guild.members.fetch(conf.memberId).then((r) => {
    target = r;
  });
  let scheduledMessage = new cron.CronJob(conf.cron, () => {
    channel.send(`Pense à demander le nouveau logo ${target}`);
  });
  // When you want to start it, use:
  scheduledMessage.start();
});
client.login(conf.token);
