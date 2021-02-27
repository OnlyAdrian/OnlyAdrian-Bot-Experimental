const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';

const fs = require('fs');

const ticket = new Map();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('The bot is online');
      client.user.setActivity('Author: OnlyAdrian', { type: 'PLAYING' })
});

client.on('message', async message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

        const ticketChannel = message.guild.channels.cache.find(t => t.name === `ticket-${message.author.id}`.toLowerCase())
    if (message.content.startsWith(`${prefix}ticket`)) {
    if (ticketChannel || ticket.get(message.author.id) === true) return message.reply('You already have an open ticket!')
    const ticketCreated = await message.guild.channels.create(`ticket-${message.author.id}`, {
      type: "text",
      permissionOverwrites: [{
        allow: "VIEW_CHANNEL",
        id: message.author.id
      },
      {
        deny: "VIEW_CHANNEL",
        id: message.guild.id
      }

      ]
    })
    ticket.set(message.author.id, true)
    const ticketEmbed = new Discord.MessageEmbed()
    .setColor("BLACK")
    .setTitle("Welcome to your ticket!")
    .setDescription(`Thanks for your ticket! We will look into it as soon as we are available!
    Write !close when you feel finished`)
    ticketCreated.send(ticketEmbed)
    message.channel.send("Your ticket was created")
    } else if (message.content.startsWith(`${prefix}close`)) {
      if (!message.channel.name.includes(`ticket`)) return message.reply('You must create a ticket first!')
      await message.channel.delete()
      ticket.set(message.author.id, false)
    }

    if(command === 'clear'){
        client.commands.get('clear').execute(message, args);
    } else if (command == 'info'){
      client.commands.get('info').execute(message, args, Discord);
    } else if (command == 'snake'){
      client.coommands.get('snake').execute(message, args, Discord);
    }
});

client.login('ODEwOTY1Mjg5MDUwODMyOTc3.YCrURw.RQVEo_XKh9TXu0gBkVzwH0Cuhtw')