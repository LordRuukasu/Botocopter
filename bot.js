console.log('<=== STARTING BOT ===>');

const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'MjY1ODc0OTgzNDI5OTk2NTQ1.C040yQ.3V6VYyRnWMSSgBZ1tUYlV3kHz4c';

var request = require('request')

bot.on('message', message => {
   if (message.content === '-ping') {
      message.channel.sendMessage('pong');
   }

   if (message.content === '-rawquick ') {
      let battletag = message.content.slice(10)
      let url = 'https://api.lootbox.eu/pc/eu/' + battletag + '/quickplay/allHeroes/'
      message.channel.sendMessage(url);
      message.channel.sendMessage('loading from DB...');
      request({
         url: url,
         json: true
      }, function(error, response, body) {
         if (!error && response.statusCode === 200) {
            body = JSON.stringify(body)
            body = body.replace(/-/g, "")
            body = body.replace(/"""/g, "")
            body = body.replace(/","/g, '",\n"')
            message.channel.sendMessage("```json\n" + body + "```");
            console.log('Searching for ' + battletag);
         }
      })
   }

   if (message.content === '-patchnotes') {
      let patch = 'https://api.lootbox.eu/patch_notes'
      message.channel.sendMessage(patch);
      message.channel.sendMessage('loading from DB...')
      request({
         patch: patch,
         json: true
      }, function(error, response, body) {
         if (!error && response.statusCode === 200) {
            body = JSON.stringify(body)
            message.channel.sendMessage("```json\n" + body + "```")
            console.log('Searching for ' + patch);
         }
      })
   }

});

bot.on('ready', () => {
  console.log('<=== BOT IS NOW READY ===>');
});

bot.login(token);
