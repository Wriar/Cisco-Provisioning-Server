const fs = require('fs');
const dataFile = process.env.DATA_FILE || "/src/data/data.json";

let cache = null;

function getDataFromFile() {
    const fc = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(fc);
}

function getCachedData() {
    if (!cache) {
        cache = getDataFromFile();
    }
    return cache;
}

function getLatestAndUpdateCache() {
    const fileData = getDataFromFile();
    cache = fileData;
    return cache;
}

function save(jsonObject) {
    cache = jsonObject;
    const jsonData = JSON.stringify(jsonObject, null, 4);
    fs.writeFile(dataFile, jsonData, 'utf-8', function(err) {
        if (err) {
            console.log("Error writing to file: " + err);
        }
    });
}

function forcePurge() {
    const fc = fs.readFileSync(dataFile, 'utf8');
    const fileData = JSON.parse(fc);
    if (JSON.stringify(fileData) === JSON.stringify(cache)) {
        console.log("Cache purge is up to date. No action taken.");
    } else {
        cache = fileData;
    }
}

module.exports = {
    get: getCachedData,
    save: save,
    forcePurge: forcePurge,
    getLatest: getLatestAndUpdateCache
};
