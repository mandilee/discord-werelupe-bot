const { Intents } = require('discord.js');

function EpicRPG(message) {
  
  this.message = message;
  
  let msgTxt = this.message.content;
  let epicRoleId = '<@&928404367063777311>';
  let action = false;
  
  this.check = function() {
  
    // Add a warning heart react if HP drops below 30%
    // Add a warning triangle if (lost HP*2) > remaining HP
    if (msgTxt.indexOf('remaining HP is') > 0) {
      let str = msgTxt.split('HP, remaining HP is');
      let lostHp = str[0].split('Lost');
      let health = str[1].split('/'),
          fullhealth = health[1].split('*');
      if ((health[0] / fullhealth[0]) < 0.3) { this.message.react("❣️"); }
      if ((lostHp[1] * 2) > health[0]) { this.message.react("⚠️"); }
    }

    // Add RIP when beating miniboss
    if (msgTxt.indexOf('HAS BEEN DEFEATED') > 0) {
      this.message.react("💀");
    }

    // Party when beating the dragon
    if (msgTxt.indexOf('DRAGON DIED,') > 0) {
      this.message.react("🥳");
    }
    
    // Join Arena
    if (msgTxt.indexOf('Type join to join the arena!') > 0) {
      action = "join";
    }
    
    for (let embed of this.message.embeds) {
      if (embed.description.includes('Type fight to help and get a reward')) {
        action = 'fight';
      } else if (embed.description.includes('Type CATCH (once) to collect some coins')) {
        action = 'catch';
      } else if (embed.description.includes('Type FISH (once) to collect some fish')) {
        action = 'fish';
      } else if (embed.description.includes('Type SUMMON (once) to join the summoning')) {
        action = 'summon';
      } else if (embed.description.includes('Type CHOP (once) to collect some wooden logs')) {
        action = 'chop';
      }  else if (embed.description.includes('Adventure ')) {
        action = 'test';
      } 
    }
    
    
    if (action != false) {
      this.message.channel.send(epicRoleId + ' ' + action);      
    }

  }
}
    
module.exports = { EpicRPG }
