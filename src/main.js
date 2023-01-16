require("dotenv").config();
const TOKEN = process.env.DISCORD_TOKEN;
const fs = require('node:fs');
const {Client, Collection, Intents, Routes, GatewayIntentBits } = require("discord.js");

//create a new Discord Client
const client = new Client({ intents: [GatewayIntentBits.Guilds] })
const collection = new Collection();

console.log('⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜');
console.log('⁜               Welcome to Koala.iO v.1.0 by D.K                    ');
console.log('⁜ Starting...                                                        ');
console.log('⁜ (-) --- | Loading slash-commands....');


// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
commandFiles.forEach(file => {
	command = require(`./commands/${file}`);
	collection.set(command.data.name, command)
})

//Log status when successfully logged in.
client.once('ready', () => {
    console.log('⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜⁜');
    console.log(`⁜ ONLINE  | Logged in as ${client.user.tag}.`);
    console.log(`⁜-------- | Actual online at ${GatewayIntentBits.Guilds} guilds.`)
    client.user.setActivity({name: 'mit dem Code...', type: "PLAYING"})
})


/**
 * Catching interactions and check for commands. 
 * If interaction is a command, it will be executed and observed.
 * Errors get catched and logged to the console.
 * If an interaction dies, the user gets informed. 
 */
client.on("interactionCreate", async (interaction) => {
    if(!interaction.isCommand()) return;                                                // ignore interaction that is no slashcommand
   
    const command = collection.get(interaction.commandName);                            // get the command out of out collection
    if(command) {
        try {                                                                           // try to
            await command.execute(interaction)                                          // execute the command 
        } catch(error) {                                                                // but catch the error if ther is any
            console.error(error)                                                        // and print it out
            if(interaction.deferred || interaction.replied) {                           // if the interaction dies (eg. missing acknowledgement)
                interaction.editReply("Es ist ein Fehler beim ausführen aufgetreten.")  // tell the user, that there was an error
            }
        }
    }

})

//login 
client.login(TOKEN)