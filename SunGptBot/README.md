
# SungptBot

SungptBot is a Telegram bot that utilizes the power of OpenAI GPT-3.5-turbo to provide various features such as text generation, voice message transcription to text, and answering questions. The bot is built using the Telegraf framework along with the OpenAI and fluent-ffmpeg libraries.

## Features

### Text Generation

SungptBot leverages the OpenAI GPT-3.5-turbo model to generate human-like text based on the provided input. Users can send a text prompt to the bot, and it will respond with a contextually relevant text completion. This feature can be used for creative writing, generating conversational responses, or getting ideas for various topics.

### Voice Message Transcription

The bot includes a voice message transcription feature that converts voice messages into text format. It utilizes the fluent-ffmpeg library to extract the audio from the voice message, and then uses automatic speech recognition (ASR) techniques to transcribe the audio into readable text. This allows users to interact with the bot using voice messages instead of typing.

### Question Answering

SungptBot also provides a question-answering capability using the OpenAI GPT-3.5-turbo model. Users can ask questions by sending a text query to the bot, and it will use the power of the language model to generate relevant answers. This feature can be helpful for retrieving information, solving queries, or seeking advice on various topics.

## Installation and Setup

To run SungptBot locally, follow these steps:

1. Install the dependencies: `npm install`
2. Set up the required environment variables:
   - `TELEGRAM_TOKEN`: Your Telegram bot token. Obtain it by creating a new bot using the BotFather on Telegram.
   - `OPENAI_KEY`: Your OpenAI API key. You can obtain it from the OpenAI platform.
5. Run the bot: `npm start`

Note: Make sure you have Node.js and npm installed on your system.

## Usage

Once the bot is up and running, you can interact with it through a Telegram chat. Send text prompts, voice messages, or questions to the bot, and it will respond accordingly.

- To generate text based on a prompt, simply send a text message to the bot.
- To transcribe a voice message, send a voice message in the chat. The bot will extract the audio and provide the transcription.
- To ask a question, send a text query to the bot, and it will generate a relevant answer.

## Contributing

Contributions to SungptBot are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue on the GitHub repository. You can also submit pull requests to contribute code improvements or new features.

When contributing, please ensure that your code adheres to the existing coding style and conventions. Include appropriate tests and documentation for the changes you make.

## License

SungptBot is released under the [MIT License](LICENSE).

## Disclaimer

SungptBot is an open-source project and not affiliated with OpenAI or Telegram. The bot is provided as-is, without any warranties or guarantees. Use it at your own risk.

Please be mindful of OpenAI's usage policies and guidelines when utilizing the OpenAI GPT-3.5-turbo model with SungptBot. Respect user privacy and ensure compliance with relevant regulations and terms of service.