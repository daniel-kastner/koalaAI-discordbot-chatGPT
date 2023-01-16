/**
 *  OpenAI Module for Discord.js ^14.7.1
 * 
 *  -- start an openAI request using slash-command: 
 *  >> /gpt string: Write me some poetric lines about koalas'
 */

const { SlashCommandBuilder }       = require('@discordjs/builders');
const { Configuration, OpenAIApi }  = require('openai');
const { config }                    = require("dotenv"); config();
const OPENAI_API_KEY  = process.env.OPENAI_API_KEY;
const configuration   = new Configuration({ apiKey: OPENAI_API_KEY, });
const openai          = new OpenAIApi(configuration);


module.exports = {
    /**
     * Building up the information about the slashcommand for the builder
     */
    data: new SlashCommandBuilder()                                 
        .setName('gpt')                                                         // name the command. This will be user command /name
        .setDescription('An implemention of the openAI (ChatGPT) API.')         // set a description of the command
        .addStringOption(option =>                                              // ---> adds a option for a userinput as textfield
            option.setName('input')                                             // -------> sets a name for the userinput
            .setDescription('The input for the AI to work with...')),           // -------> set a description of what the user schould input

    /**
     * The slashcommand itself. 
     */
    async execute(interaction) {
    
        const prompt = interaction.options.getString('input');                   // load the userinput out of options
        
        /** Important: acknowledgement
         *  Discord requires an acknowledgement from your bot within three seconds that the interaction was received. 
         *  Otherwise, Discord considers the interaction to have failed and the token becomes invalid.
         *  In this case, you can make use of the ChatInputCommandInteraction#deferReply() method, 
         *  which triggers the <application> is thinking... message.
         * 
         *  Trigger the <application> is thinking... message with interaction.deferReply(), 
         *  so acknowledgement is sent. Otherwise the interaction fails and the token gets invalid.
         */
    
        await interaction.deferReply();                                             // trigger "the thinking... message"
        await interaction.followUp(`🐨 Task: ` + prompt + '... Please wait.');      // showing up the userinput while waiting for the api reply
		const reply = await ask(prompt);                                            // calling the api (ask()) and store the results in const reply
        

        //Discord allows max msg length of 2000 chars. Longer replies will crash. So the reply gets splitted. 
        if (reply.length > 1999) {
            const replies = splitReply(reply);                                      // splitReply() returns Array with splitted reply
            replies.forEach(async (r) => await interaction.followUp(r));            // send reply as followUp (deferred response)
          } else {
            await interaction.editReply(reply);                                     // if reply < 1999 editReply (deferred response)
          }  
    }
}


/**
 * ask(prompt) creates the openAI_API request, fires and returns
 * the reply message content as a string. The configuration of the request
 * is given below. 

 */
async function ask(prompt) {
    const response = await openai.createCompletion({    // creating the request and send it
        model: "text-davinci-003",                      // ai model eg: text-davinci-001, text-davinci-002, text-davinci-003 
        prompt,                                         // the task for the AI to work with
        temperature: 0.7,
        max_tokens: 4000,                               // text-davinci-003 provides max 4000 tokens
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    return response.data.choices[0].text;               // Return the plane text of AI response as string
}


/**
 * splitReply(reply) splits the AI_API reply in an array with strings 
 *  of max 1999 chars, to avoid the limitation to 2000 chars per message by discord.
 */
function splitReply(reply) {

        var currentString = "";
        var replies = [];                                 

        for (var i = 0; i < reply.length; i++) {            // loop over every char of the input string and
            currentString += reply[i];                      // add the current char to the currentString

            if (currentString.length === 1999) {            // after adding 1999 chars, push currentString into
                replies.push(currentString);                // the replies-Array and reset currentString 
                currentString = "";                       
            }
         }

         if (currentString.length > 0) {                    // if there are still chars left push them into
            replies.push(currentString);                    // a last element of the replies array
        }
    return replies;                                  
}
