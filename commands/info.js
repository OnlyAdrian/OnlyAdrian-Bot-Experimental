module.exports = {
  name: 'info',
  description: "this is a info command",
  execute(message, args, Discord){

    const infoEmbed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setTitle("Information")
    .setDescription("Her is all information you need to know about this bot")
    .addFields(
      { name: 'Basics', value: 'You can feel free to use this bot, but give me credz for my work' },
      { name: 'Commands', value: 'I add commands to this bot as soon as I get some inspiration. You can also add commands.' }
    )
    .setFooter("Developed by OnlyAdrian")

    message.channel.send(infoEmbed)
  }
}