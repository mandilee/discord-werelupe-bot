client.on("messageCreate", (message) => {
  
  // Add a warning heart react if HP drops below 30%
  // Add a warning triangle if (lost HP*2) > remaining HP
  if (message.content.indexOf('remaining HP is') > 0) {
    let str = message.content.split('HP, remaining HP is');
    let lostHp = str[0].split('Lost');
    let health = str[1].split('/'),
        fullhealth = health[1].split('*');
    if ((health[0] / fullhealth[0]) < 0.3) { message.react("❣️"); }
    if ((lostHp[1] * 2) > health[0]) { message.react("⚠️"); }
  }

  // Add RIP when beating miniboss
  if (message.content.indexOf('HAS BEEN DEFEATED') > 0) {
    message.react("602574893745307668");
  }

  // 
  if (message.content.indexOf('DRAGON DIED,') > 0) {
    message.react("🥳");
  }

  
});
