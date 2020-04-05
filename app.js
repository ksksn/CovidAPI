const express = require("express");
const request = require('request');
const cheerio = require('cheerio');
var app = express();

app.get("/countryStats", (req, res, next) => {
    var status;
    request('https://www.mohfw.gov.in/', (error,response,html) => {
    var $ = cheerio.load(html);

    const activeCases = $('.bg-blue');
    const curedCases = $('.bg-green');
    const deathCases = $('.bg-red');
    const migratedCases = $('.bg-orange');

    status = {
        "Active Cases" : activeCases.children('strong').text(),
        "Cured Cases" : curedCases.children('strong').text(),
        "Death Cases" : deathCases.children('strong').text(),
        "Migrated Cases" : migratedCases.children('strong').text()
    };

    res.json(status);
}); 
});

app.get("/stateStats", (req, res, next) => {

    request('https://www.mohfw.gov.in/', (error,response,html) => {
    var $ = cheerio.load(html);
    var stateWiseCount = {};
    $('#state-data > div > div > div > div > table > tbody > tr').each((index, element) => {
        
     var states = $($(element).find('td')[1]).text();
     var totalCasesCount = $($(element).find('td')[2]).text();
     var curedCasesCount = $($(element).find('td')[3]).text();
     var deathCasesCount = $($(element).find('td')[4]).text();
 
     //console.log(curedCasesCount);
     stateWiseCount[index]= {
         "State" : $($(element).find('td')[1]).text(),
         "Total Cases" : $($(element).find('td')[2]).text(),
         "Cured Cases" : $($(element).find('td')[3]).text(),
         "Death Cases" : $($(element).find('td')[4]).text()
     };
     });
    
    res.json(stateWiseCount);
}); 
});
app.listen(3000, () => {
 console.log("Server running on port 3000");
});