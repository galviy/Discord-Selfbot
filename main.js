const fetch = require('node-fetch');
const send = require('./sendmessage');

setInterval(function() {
    send.Message("pls use hoe");
}, 901000)

setInterval(function() {
    send.Message("pls use piz");
}, 3600000);

setInterval(function() {
    send.Message("pls beg");
}, 46000);

setInterval(function() {
    send.Message("pls hunt");
}, 3000);

setInterval(function() {
    send.Message("pls fish");
}, 3000);

setInterval(function() {
    send.Message("pls dig");
}, 41000);

setInterval(function() {
    send.Message("pls use daily");
}, 601000);