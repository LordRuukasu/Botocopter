console.log('<=== STARTING BOT ===>');
console.log('+');
console.log('+');
console.log('+');
console.log('+');
console.log('+');

const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'MjY2MTg0NTM3NjQ0NDY2MTg2.C05_Ng.oG0Wl0XM6WrMQcRUsn2IssyyY-U';

var request = require('request')

bot.on('message', message => {

   if (message.content === '-help'){
      let m = '``-ping = Ping Pong``\n'
      m += '``-userinfo = Your Userinfos``\n'
      m += '``-patchnotes = Overwatch Patchnotes``\n'
      m += '``-eucomp <Overwatch Battletag> = Overwatch some Stats of all Heroes in Competitive``\n'
      m += '``-rawcomp <Overwatch Battletag> = Overwatch ALL Stats of all Heroes in Competitive``\n'
      m += '``-rawquick <Overwatch Battletag> = Overwatch ALL Stats of all Heroes in Quickplay``\n'
      message.channel.sendMessage(m);
   }

//PING
   if (message.content === '-ping') {
      message.channel.sendMessage('pong')
   }

// OVERWATCH QUICK RAW
   if (message.content === '-rawquick ') {
      let url = 'https://api.lootbox.eu/pc/eu/Ruukasu-21150/quickplay/allHeroes/'
      message.channel.sendMessage(url)
      message.channel.sendMessage('loading...')
      request({
         url: url,
         json: true
      },
      function(error, response, body, headers) {
         if (!error && response.statusCode === 200) {
            body = JSON.stringify(body)
            body = body.replace(/-/g, "")
            body = body.replace(/"""/g, "")
            body = body.replace(/","/g, '",\n"')
            console.log('Searching for ' + battletag)
            message.channel.sendMessage("```json\n" + body + "```")
         }
      })
   }

   // OVERWATCH QUICK RAW
      if (message.content === '-rawcomp ') {
         let battletag = message.content.slice(9)
         let url = 'https://api.lootbox.eu/pc/eu/' + battletag + '/competitive/allHeroes/'
         message.channel.sendMessage(url)
         message.channel.sendMessage('loading from DB...')
         request({
            url: url,
            json: true
         }, function(error, response, body) {
            if (!error && response.statusCode === 200) {
               body = JSON.stringify(body)
               headers = JSON.stringify(headers)
               body = body.replace(/-/g, "")
               body = body.replace(/"""/g, "")
               body = body.replace(/","/g, '",\n"')
               message.channel.sendMessage("```json\n" + body + "```")
               console.log('Searching for ' + battletag `${headers.date}`)
            }
         })
      }

      if (message.content === '-eucomp ') {
         let battletag = message.content.slice(8)
         let url = 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#', '-') + '/competitive/allHeroes/'
         message.channel.sendMessage(url)
         message.channel.sendMessage('loading from DB...')
         request({
            url: url,
            json: true
         }, function(error, response, body) {
            if (!error && response.statusCode === 200) {
               body = JSON.stringify(body)
               body = body.replace(/-/g, "")
               body = JSON.parse(body)
               let kd = body.Eliminations
               let Winrate = body.GamesWon / body.GamesPlayed * 100
               let m = ''
               m += '```ruby\n'
               m += `${battletag} "Competitive Profile"\n`
               m += `Comp Games Winrate: ${Winrate}%\n`
               m += `Comp Games Played: ${body.GamesPlayed}\n`
               m += `Comp Games Won: ${body.GamesWon}\n`
               m += `Eliminations: ${body.Eliminations}\n`
               m += `Kills/Death: ${body.EliminationsAverage}\n`
               m += `Damage: ${body.DamageDone}\n`
               m += `Heal: ${body.HealingDone}\n`
               m += `Medals: ${body.Medals}\n`
               m += `-Gold Medals: ${body.MedalsGold}\n`
               m += `-Silver Medals: ${body.MedalsSilver}\n`
               m += `-Bronze Medals: ${body.MedalsBronze}\n`
               m += '```'
               message.channel.sendMessage(m)
            }
         })
      }

// OVERWATCH PATCHNOTES
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

// USERINFO
   if (message.content === '-userinfo'){
      let m = message.author.username + '\n'
      m += message.author.id + '\n',
      m += message.author.permium + '\n',
      m += message.author.avatarURL
      message.channel.sendMessage(m);
   }


// KILLING THE BOT

    if (message.content.startsWith('.kill') && message.author.id === '148764744231157760') {
      var rand = new Array ();
      rand[0] = "Killed by Hanzo";
      rand[1] = "Sleeping with the fishes";
      rand[2] = "Going to sleep now";
      rand[3] = "You know, shatter arrow...";
      rand[4] = "Hasta la vista, baby";
      rand[5] = "Shutting down the Computer";
      rand[6] = "Quitting time";
      var i = Math.floor(7*Math.random())
        message.channel.sendMessage(rand[i])
        setTimeout(function() {
            process.exit(1)
        }, 1000)
    }
});

bot.on('ready', () => {
   console.log('<=== BOT IS NOW READY ===>');
});

bot.login(token);
