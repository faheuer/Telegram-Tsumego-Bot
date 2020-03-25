require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;


var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'a'});
var log_stdout = process.stdout;

const beginnerFolder = './media/beginner/';
const kyuFolder = './media/kyu/';
const danFolder = './media/dan/';
const dantwFolder = './media/dan2/';
const memeFolder = './media/meme/';


function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

//console.log(getFiles(beginnerFolder))

var beginner = getFiles(beginnerFolder);
var kyu = getFiles(kyuFolder);
var dan = getFiles(danFolder);
var dantw = getFiles(dantwFolder);
var meme = getFiles(memeFolder);



console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

// Created instance of TelegramBot
const bot = new TelegramBot(token, {
    polling: true
});

// In-memory storage
const URLs = [];
const URLLabels = [];
let tempSiteURL = '';

// Listener (handler) for telegram's /bookmark event

bot.onText(/\/beginner/, (msg, match) => {
    const chatId = msg.chat.id;
    const url = match.input.split(' ')[1];
    
    let rnd = Math.floor((Math.random() * (beginner.length)) + 0);
    let mex = beginner[rnd];
    bot.sendMessage(msg.chat.id, "Here is your Beginner Problem:");
    bot.sendPhoto(msg.chat.id, mex);
});

bot.onText(/\/kyu/, (msg, match) => {
    const chatId = msg.chat.id;
    const url = match.input.split(' ')[1];
    
    let rnd = Math.floor((Math.random() * (kyu.length)) + 0);
    let mex = kyu[rnd];
    bot.sendMessage(msg.chat.id, "Here is your Kyu Problem:");
    bot.sendPhoto(msg.chat.id, mex);
});

bot.onText(/\/dan/, (msg, match) => {
    const chatId = msg.chat.id;
    const url = match.input.split(' ')[1];
    
    let rnd = Math.floor((Math.random() * (dan.length)) + 0);
    let mex = dan[rnd];
    bot.sendMessage(msg.chat.id, "Here is your Dan Problem:");
    bot.sendPhoto(msg.chat.id, mex);
});

bot.onText(/\/edan/, (msg, match) => {
    const chatId = msg.chat.id;
    const url = match.input.split(' ')[1];
    
    let rnd = Math.floor((Math.random() * (dantw.length)) + 0);
    let mex = dantw[rnd];
    bot.sendPhoto(msg.chat.id, mex);
});

bot.onText(/\/meme/, (msg, match) => {
    const chatId = msg.chat.id;
    const url = match.input.split(' ')[1];
    
    let rnd = Math.floor((Math.random() * (meme.length)) + 0);
    let mex = meme[rnd];
    bot.sendPhoto(msg.chat.id, mex);
});

function giveDaily (msg, match){
    const chatId = msg.chat.id;
    const url = match.input.split(' ')[1];
    
    let rnd2 = Math.floor((Math.random() * 3) + 0);
    if (rnd2 == 0){
        let rnd = Math.floor((Math.random() * (beginner.length)) + 0);
        let mex = beginner[rnd];
        bot.sendMessage(msg.chat.id, "Here is your Daily Problem (Beginner):");
        bot.sendPhoto(msg.chat.id, mex);
    }
    if (rnd2 == 1){
        let rnd = Math.floor((Math.random() * (kyu.length)) + 0);
        let mex = kyu[rnd];
        bot.sendMessage(msg.chat.id, "Here is your Daily Problem (Kyu):");
        bot.sendPhoto(msg.chat.id, mex);
    }
    if (rnd2 == 2){
        let rnd = Math.floor((Math.random() * (dan.length)) + 0);
        let mex = dan[rnd];
        bot.sendMessage(msg.chat.id, "Here is your Daily Problem (Dan):");
        bot.sendPhoto(msg.chat.id, mex);
    }
}

var daily_bool

bot.onText(/\/daily/, (msg, match) => {
    daily_bool = setInterval(giveDaily, 10*1000, msg, match); //24*60*6
});

bot.onText(/\/off_daily/, (msg, match) => {
    clearInterval(daily_bool );
});
