require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// Create a new Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Bot token from .env file
const token = process.env.TOKEN;

// Channel ID where the bot will send the message
const CHANNEL_ID = '1330720697919471706';
let day = 4;

// Function to send daily messages
function scheduleDailyMessage() {
    const now = new Date();
    const nextTrigger = new Date();
    nextTrigger.setHours(7, 0, 0, 0); // Set to 7:00 AM

    if (now > nextTrigger) {
        nextTrigger.setDate(nextTrigger.getDate() + 1);
    }

    const delay = nextTrigger - now;

    setTimeout(() => {
        sendDailyMessage();
        setInterval(sendDailyMessage, 24 * 60 * 60 * 1000); // Repeat every 24 hours
        //setInterval(sendDailyMessage, 60 * 1000); // Repeat every 1 minute for testing
    }, delay);
}

// Send a message to the channel
function sendDailyMessage() {
    const channel = client.channels.cache.get(CHANNEL_ID);
    if (channel) {
        day++;
        channel.send("Day " + day + "! Please feel free to tag everyone if you need prayer requests, we are in this together.");
    } else {
        console.error('Channel not found. Please check the CHANNEL_ID.');
    }
}

// Bot login
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    scheduleDailyMessage();
});

client.login(token);
