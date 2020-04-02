const express = require("express");
const request = require('request');
const cheerio = require('cheerio');
var app = express();

function covidCount(){
    var statusJSON;
    request('https://www.mohfw.gov.in/', (error,response,html) => {
    var $ = cheerio.load(html);

    const activeCases = $('.bg-blue');
    const curedCases = $('.bg-green');
    const deathCases = $('.bg-red');
    const migratedCases = $('.bg-orange');

    var status = {
        "Active Cases" : activeCases.children('strong').text(),
        "Cured Cases" : curedCases.children('strong').text(),
        "Death Cases" : deathCases.children('strong').text(),
        "Migrated Cases" : migratedCases.children('strong').text()
    };
    statusJSON = JSON.stringify(status);
    console.log(statusJSON);
});
return statusJSON;
}

app.get("/url", (req, res, next) => {

    res.type('json');
    res.json(covidCount());
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});