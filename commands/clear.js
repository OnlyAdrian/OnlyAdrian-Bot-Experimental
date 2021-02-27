module.exports = {
    name: 'clear',
    description: "Clear messages",
    async execute(message, args) {
        if(!args[0]) return message.reply("Please specify how many messages you want to delete!");
        if(isNaN(args[0])) return message.reply("Please enter a valid number!");

        if(args[0] > 100) return message.reply("You can not delete more than 100 messages!");
        if(args[0] < 1) return message.reply("You must delete more than 1 message!");

        await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
            message.channel.bulkDelete(messages);
        });
    }
}