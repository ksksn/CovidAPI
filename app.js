const express = require("express");
const request = require('request');
const cheerio = require('cheerio');
let app = express();

app.get("/countryStats", (req, res, next) => {
    let status;
    request('https://www.mohfw.gov.in/', (error, response, html) => {
        let $ = cheerio.load(html);

        const activeCases = $('.bg-blue');
        const curedCases = $('.bg-green');
        const deathCases = $('.bg-red');
        const migratedCases = $('.bg-orange');

        status = {
            "Active Cases": activeCases.children('strong').text(),
            "Cured Cases": curedCases.children('strong').text(),
            "Death Cases": deathCases.children('strong').text(),
            "Migrated Cases": migratedCases.children('strong').text()
        };

        res.json(status);
    });
});

app.get("/stateStats", (req, res, next) => {

    request('https://www.mohfw.gov.in/', (error, response, html) => {
        let $ = cheerio.load(html);
        let stateWiseCount = {};
        let count = 0;
        $('#state-data > div > div > div > div > table > tbody > tr').each((index, element) => {

            if (count == 30) {
                return;
            }

            stateWiseCount[index] = {
                "State": $($(element).find('td')[1]).text(),
                "Total Cases": $($(element).find('td')[2]).text(),
                "Cured Cases": $($(element).find('td')[3]).text(),
                "Death Cases": $($(element).find('td')[4]).text()
            };
            count++;
        });
        res.json(stateWiseCount);
    });
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
});