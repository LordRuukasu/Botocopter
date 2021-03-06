console.log('<=== STARTING BOT ===>');

const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'MjY2MTg0NTM3NjQ0NDY2MTg2.C05_Ng.oG0Wl0XM6WrMQcRUsn2IssyyY-U';

var request = require('request')
var rls = require('rls-api');

Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}

bot.on('message', message => {


//HELP
   if (message.content === '=help'){
      let m = '``=ping = Ping Pong``\n'
      m += '``=userinfo = Your userinfos``\n'
      m += '``=patchnotes = Overwatch patchnotes``\n'
      m += '``=owprofile <Overwatch Battletag> = Your overall stats``\n'
      m += '``=comp <Overwatch Battletag> = Overwatch some stats of all heroes in Competitive``\n'
      m += '``=rawcomp <Overwatch Battletag> = Overwatch ALL stats of all heroes in Competitive``\n'
      m += '``=quick <Overwatch Battletag> = Overwatch some stats of all heroes in Quickplay``\n'
      m += '``=rawquick <Overwatch Battletag> = Overwatch ALL stats of all heroes in Quickplay``\n'
      message.author.sendMessage(m);
   }

//PING
   if (message.content === '=ping') {
      message.channel.sendMessage('pong')
   }

// USERINFO
   if (message.content === '=userinfo'){
      let m = message.author.username + '\n'
      m += message.author.id + '\n',
      m += message.author.avatarURL
      message.channel.sendMessage(m);
   }

// KILLING THE BOT

    if (message.content.startsWith('=kill') && message.author.id === '148764744231157760') {
      var rand = new Array ();
      rand[0] = "Killed by Hanzo";
      rand[1] = "Sleeping with the fishes";
      rand[2] = "Going to sleep now";
      rand[3] = "You know, shatter arrow...";
      rand[4] = "Hasta la vista, baby";
      rand[5] = "Shutting down the Computer";
      rand[6] = "Quitting time";
      rand[7] = "My work here is done";
      rand[8] = "/tableflip";
      var i = Math.floor(9*Math.random())
        message.channel.sendMessage(rand[i])
        setTimeout(function() {
            process.exit(1)
        }, 1000)
    }

//BOT SERVER TEST
   if (message.content.startsWith('=eval') && message.author.id === '64438454750031872' || message.content.startsWith('=eval') && message.author.id === '148764744231157760') {
      try {
          const com = eval(message.content.split(" ").slice(1).join(" "))
             message.channel.sendMessage('```\n' + com + '```')
         } catch (e) {
             message.channel.sendMessage('```\n' + e + '```')
         }
      }

//ROLEPLAY
   {
   let text = message.content.slice(4)
   if (message.content.startsWith('=rp ' + text) && message.author.id === '148764744231157760') {
      bot.channels.get('136207583584190466').sendMessage(text)
   }}

// OVERWATCH QUICK RAW
   if (message.content.startsWith('=rawquick ') && message.content.match(/\b(.)+#+(\d{4,5})\b/g)) {
      let battletag = message.content.slice(10)
      let url = 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#', '-') + '/quickplay/allHeroes/'
      message.channel.sendMessage(url)
      message.channel.sendMessage('loading...')
      request({
         url: url,
         json: true
      },
      function(error, response, body) {
         if (!error && response.statusCode === 200) {
            body = JSON.stringify(body)
            body = body.replace(/-/g, "")
            body = body.replace(/","/g, '",\n"')
            console.log('Searching quickstats for ' + battletag)
            message.channel.sendMessage("```json\n" + body + "```")
         }
      })
   }

   if (message.content.startsWith('=embed ')){
      exports.run = function(bot, message, args) {
          const discord = require('discord.js')
          const embed = new discord.RichEmbed()
      	.setThumbnail()
      	.setAuthor('Botocopter', 'https://cdn.discordapp.com/attachments/223447405478150144/266918526818713600/avatar3.png')
      	.setTitle('Very Nice Title')
      	.setDescription('The text of the body, essentially')
      	.setURL('https://discord.js.org/#/docs/main/indev/class/RichEmbed')
      	.setColor('#CA4746')

      	.addField('Titel', 'Feld')
      	.addField('Titel2', 'Feld2')
      	.addField(':thinking:', ':thinking:')

      	//.setImage('https://goo.gl/D3uKk2')
      	.setFooter('Bot by LordRuukasu', 'https://cdn.discordapp.com/avatars/148764744231157760/c98b013e2dc1b91fa01cfda5a5e527da.jpg?size=1024')
      	.setTimestamp()
      	message.channel.sendEmbed(embed)
      }
   }

// OVERWATCH COMPETITIVE STATS (LONG)
   if (message.content.startsWith('=rawcomp ') && message.content.match(/\b(.)+#+(\d{4,5})\b/g)) {
      let battletag = message.content.slice(9)
      let url = 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#', '-') + '/competitive/allHeroes/'
      message.channel.sendMessage(url)
      message.channel.sendMessage('loading...')
      request({
         url: url,
         json: true
      },
      function(error, response, body) {
         if (!error && response.statusCode === 200) {
            body = JSON.stringify(body)
            body = body.replace(/-/g, "")
            body = body.replace(/","/g, '",\n"')
            console.log('Searching compstats for ' + battletag)
            message.channel.sendMessage("```json\n" + body + "```")
         }
      })
   }

//OVERWATCH COMPETITIVE STATS (SHORT)
   if (message.content.startsWith('=comp ') && message.content.match(/\b(.)+#+(\d{4,5})\b/g)) {
      let battletag = message.content.slice(6)
      let url = 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#', '-') + '/competitive/allHeroes/'
      message.channel.sendMessage(url)
      message.channel.sendMessage('loading...')
      request({
         url: url,
         json: true
      },
      function(error, response, body) {
         if (!error && response.statusCode === 200) {
            body = JSON.stringify(body)
            body = body.replace(/-/g, "")
            body = body.replace(/","/g, '",\n"')
            body = JSON.parse(body)
            let kd = body.Eliminations
            let Winrate = body.GamesWon / body.GamesPlayed * 100
            let m = ''
            m += '```js\n'
            m += `${battletag} "Quick Profile"\n`
            m += 'Comp Games Winrate:' + Winrate.round(2) + '%\n'
            m += `Comp Games Played: ${body.GamesPlayed}\n`
            m += `Comp Games Won: ${body.GamesWon}\n`
            m += `Eliminations: ${body.Eliminations}\n`
            m += `Kills/Death: ${body.EliminationsAverage}\n`
            m += `Damage: ${body.DamageDone}\n`
            m += `Heal: ${body.HealingDone}\n`
            m += `Medals: ${body.Medals}\n`
            m += `- Gold Medals: ${body.MedalsGold}\n`
            m += `- Silver Medals: ${body.MedalsSilver}\n`
            m += `- Bronze Medals: ${body.MedalsBronze}\n`
            m += '```'
            console.log('Searching Compstats for ' + battletag)
            message.channel.sendMessage(m)
         }
      })
   }

//OVERWATCH QUICKGAME STATS
   if (message.content.startsWith('=quick ') && message.content.match(/\b(.)+#+(\d{4,5})\b/g)) {
      let battletag = message.content.slice(7)
      let url = 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#', '-') + '/quickplay/allHeroes/'
      message.channel.sendMessage(url)
      message.channel.sendMessage('loading...')
      request({
         url: url,
         json: true
      },
      function(error, response, body) {
         if (!error && response.statusCode === 200) {
            body = JSON.stringify(body)
            body = body.replace(/-/g, "")
            body = body.replace(/","/g, '",\n"')
            body = JSON.parse(body)
            let m = ''
            m += '```json\n'
            m += `${battletag} "Quick Profile"\n`
            m += `Quick Games Won: ${body.GamesWon}\n`
            m += `Eliminations: ${body.Eliminations}\n`
            m += `Kills/Death: ${body.EliminationsAverage}\n`
            m += `Damage: ${body.DamageDone}\n`
            m += `Heal: ${body.HealingDone}\n`
            m += `Medals: ${body.Medals}\n`
            m += `- Gold Medals: ${body.MedalsGold}\n`
            m += `- Silver Medals: ${body.MedalsSilver}\n`
            m += `- Bronze Medals: ${body.MedalsBronze}\n`
            m += '```'
            console.log('Searching Quickstats for ' + battletag)
            message.channel.sendMessage(m)
         }
      })
   }

// OVERWATCH PROFILE
   if (message.content.startsWith('=owprofile ') && message.content.match(/\b(.)+#+(\d{4,5})\b/g)) {
      let battletag = message.content.slice(11)
      let url = 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#', '-') + '/profile'
      message.channel.sendMessage(url)
      message.channel.sendMessage('loading...')
      request({
         url: url,
         json: true
      },
      function(error, response, body) {
         if (!error && response.statusCode === 200) {
            body = JSON.stringify(body)
            body = body.replace(/-/g, "")
            body = body.replace(/","/g, '",\n"')
            body = JSON.parse(body)
            let playtime = body.quick + body.competitive
            let m = ''
            m += `${body.avatar}\n`
            m += '```json\n'
            m += `${battletag} "Overview"\n`
            m += `Level: ${body.level}\n`
            m += `Playtime: ${playtime}\n`
            m += `- quick: ${body.quick}\n`
            m += `- competitive: ${body.competitive}\n`
            m += `Rank: ${body.rank}\n`
            m += '```'
            m += `${body.rank_img}\n`
            console.log('Searching Profile Overview for ' + battletag)
            message.channel.sendMessage(m)
         }
      })
   }

   // OVERWATCH PATCHNOTES
   if (message.content === '=patchnotes'){
      let url = 'https://api.lootbox.eu/patch_notes'
      message.channel.sendMessage(url)
      message.channel.sendMessage('loading...')
      request({
         url: url,
         json: true
      },
      function(error, response, body) {
         if (!error && response.statusCode === 200) {
            body = JSON.stringify(body)
            body = body.replace(/-/g, "")
            body = body.replace(/","/g, '",\n"')
            body = JSON.parse(body)
            let m = ''
            m += '```json\n'
            m += `Version: ${body.patchVersion}\n`
            m += `Status: ${body.status}\n`
            m += `${body.detail}\n`
            m += '```'
            message.channel.sendMessage(m)
         }
      })
   }

   if (message.content === '=rlplayer'){
      client.searchPlayers("TriggeredTryhard", function(status, data){
         if(status == 200){
            let m = ''
            m += '```json\n'
            m += 'Player Search Data:\n'
            m += 'Results:  + data.results\n'
            m += 'Total Results: " + data.totalResults'
            m += '```'
            message.channel.sendMessage(m)
         }
      });
   }

});

bot.on('ready', () => {
   console.log('<=== BOT IS NOW READY ===>');
});

bot.login(token);
