const { Intents } = require('discord.js');

function EpicRPG(message) {

  this.message = message;
  this.action = false;

  let msgTxt = this.message.content;
  let epicRoleId = '<@&928404367063777311>';

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

    this.action = this.checkEmbed();
    if (this.action != false) {
      this.message.channel.send(epicRoleId + ' ' + this.action);      
    }
  
  this.checkEmbed = function() {
    if (this.message.embeds.length > 0) {
      for (let embed of this.message.embeds) {
        
        let fullText = embed.description + ' ' embed.title + ' ';
        
        for (let field of embed.fields) {
          fullText += field.value + ' ' + field.name;
        }
      
        if (fullText.includes('Type join to join the arena')) {
          return 'join';
        } else if (fullText.includes('Type fight to help and get a reward')) {
          return 'fight';
        } else if (fullText.includes('Type CATCH (once) to collect some coins')) {
          return 'catch';
        } else if (fullText.includes('Type FISH (once) to collect some fish')) {
          return 'fish';
        } else if (fullText.includes('Type SUMMON (once) to join the summoning')) {
          return 'summon';
        } else if (fullText.includes('Type CHOP (once) to collect some wooden logs')) {
          return 'chop';
        }  else if (fullText.includes('Adventure ')) {
          return 'test';
        } 

      }
    }
  }
    
    return false;
  }
}

module.exports = { EpicRPG }
