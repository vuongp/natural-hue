const config = require("./config.json");
const http = require('http');
const request = require('request');

function getLightBrightness(lightIndex, callback){
  request({
    url: `http://${config.ip}/api/${config.user}/lights/${lightIndex}`,
    method: 'GET'}, function(err, req, body){
      callback(JSON.parse(body).state.bri);
    })
}

function setLightBrightness(lightIndex, brightness){
  request({
    url: `http://${config.ip}/api/${config.user}/lights/${lightIndex}/state`,
    method: 'PUT',
    json: {bri: brightness}}, function(err, req, body){})
}

function switchLight(lightIndex, lightOn){
  request({
    url: `http://${config.ip}/api/${config.user}/lights/${lightIndex}/state`,
    method: 'PUT',
    json: {on: lightOn}}, function(err, req, body){})
}

function getWantedBrightness(){
  var hour = new Date().getHours();
  return config.brightness[hour];
}

setInterval(function(){
  setLightBrightness(config.light, getWantedBrightness());
}, 4000);
