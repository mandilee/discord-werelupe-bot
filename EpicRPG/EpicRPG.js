const { Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');

function EpicRPG(message) {
  
  this.message = message;
  this.responseEmbed = new MessageEmbed();
  
  let msgTxt = this.message.content;
  
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
      this.responseEmbed.setDescription("<@&928404367063777311> join");
      this.message.channel.send({ embeds: [this.responseEmbed] });
    }
    
    // Fight Miniboss
    if (msgTxt.indexOf('Type fight to help and get a reward!') > 0) {
      this.responseEmbed.setDescription("<@&928404367063777311> fight");
      this.message.channel.send({ embeds: [this.responseEmbed] });
    }
    
    // Catch Coins
    if (msgTxt.indexOf('Type CATCH (once) to collect some coins!') > 0) {
      this.responseEmbed.setDescription("<@&928404367063777311> catch");
      this.message.channel.send({ embeds: [this.responseEmbed] });
    }
    
    // Collect Fish
    if (msgTxt.indexOf('Type FISH (once) to collect some fish!') > 0) {
      this.responseEmbed.setDescription("<@&928404367063777311> fish");
      this.message.channel.send("<@&928404367063777311> fish");
    }
    
    // Collect Fish
    if (msgTxt.indexOf('Type SUMMON (once) to join the summoning!') > 0) {
      this.responseEmbed.setDescription("<@&928404367063777311> summon");
      this.message.channel.send({ embeds: [this.responseEmbed] });
    }
    
    // Chop logs
    if (msgTxt.indexOf('Type CHOP (once) to collect some wooden logs!') > 0) {
      this.responseEmbed.setDescription("<@&928404367063777311> chop");
      this.message.channel.send({ embeds: [this.responseEmbed] });
    }

  }
}
    
module.exports = { EpicRPG }
