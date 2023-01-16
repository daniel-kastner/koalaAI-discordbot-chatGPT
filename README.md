# koalaAI-discordbot-chatGPT
![image](https://user-images.githubusercontent.com/99447017/212478345-092e8fde-6b68-4854-838e-2985a606d285.png)

This repository contains the source code for a Discordbot Core with GPT3 integration. This Discordbot Core is designed to use the GPT-3 API provided by OpenAI to 
generate natural-sounding messages from user input. Using the GPT-3 API, the Discordbot Core can understand natural language input and generate appropriate responses. 

This repository starts now and will grow by time. Due to the modular architecture, SLASH-Commands can be added. 

Website: https://www.daniel-kastner.com

### Tree
- `src`
  - `deploy-commands.js` Actual used with `node ./src/deploy-commands.js` to deploy new commands. 
  - `main.js` The main file containing the code for the Discordbot Core:
    - `commands` This folder contains all slash-commandfiles. New commandfiles can be stored here. 
      - `openAI.js` Slash-command file for the GPT3 request.
      - `ping.js` Slash-command for a simple 'Ping' - 'PONG!'
- `.env` Configuration. Keyvalues need to be edited before use
- `package.json` Package file. Use `npm i` to install necessary packages.
- `README.md` This file containing information about the repository.



## Getting Started
To get started with the Discordbot Core and GPT3 integration, you will need to install the necessary dependencies and configure the .env file.

1. Install the dependencies:
```
npm install
```

    
    
2. Configure the bot:
    - Set the TOKEN, IDs and API_KEY in the `.env` file.

3. start your bot:
```
node ./src/main.js
```

## Usage
in Discord: `/gpt <your task for gpt to do>`

You can use natural language input to interact with the bot. For example, you can ask the bot questions like 
```
/gpt tell me a story of a koala leaving to new york` and the bot will generate an appropriate response.
```


## Adding new slash-commands
Create a new .js-file in `./src/commands/` and ensure to use following blueprint to ensure your command will be included correct.

```
const { SlashCommandBuilder }       = require('@discordjs/builders');
const { Configuration, OpenAIApi }  = require('openai');
const { config }                    = require("dotenv"); config();
const OPENAI_API_KEY  = process.env.OPENAI_API_KEY;
const configuration   = new Configuration({ apiKey: OPENAI_API_KEY, });
const openai          = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()                                 
        .setName('yourcommandname')                                         // REPLACE yourcommandname                                                
        .setDescription('Your command description to help the user. :)'),   // REPLACE your description          

    // the slash command itself
    execute(interaction) {
              
          // ---------------------------------------------------------------This is where all your code can be placed
       
         } 
}
```
After creating your slash-command.js file use the deploy-commands.js to send the updated commands to your bot. 
```
npm ./src/deploy-commands.js
```

## Contributing

If you would like to contribute to the development of this Discordbot Core with GPT3 integration, feel free to send a pull request. All contributions are welcome and appreciated.

## License
Copyright 2023 Daniel Kastner

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
