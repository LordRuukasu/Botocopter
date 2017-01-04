const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'MjY1ODc0OTgzNDI5OTk2NTQ1.C040yQ.3V6VYyRnWMSSgBZ1tUYlV3kHz4c';

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.on('message', message => {
   if (message.content === '-ping') {
      message.channel.sendMessage('pong');
   }
   if (message.content === '-rawquick') {
      let battletag = message.content.slice(10)
      let url = 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#', '-') + '/quick-play/allHeroes/'
      message.channel.sendMessage(url)
      message.channel.sendMessage('loading from DB...')
      req.request({
         url: url,
         json: true
      }, function(error, response, body) {
         if (!error && response.statusCode === 200) {
            body = JSON.stringify(body)
            body = body.replace(/-/g, "")
            body = body.replace(/","/g, '",\n"')
            message.channel.sendMessage("```json\n" + body + "```")
         }
      })
   }
});

bot.login(token);
