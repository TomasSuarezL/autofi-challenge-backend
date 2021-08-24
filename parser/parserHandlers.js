const neatCsv = require("neat-csv");
const fs = require("fs");

/**
 * Parses a CSV file, separated by ';'. 
 *
 * @param {String} pathToFile Path to the CSV file that we want to parse.
 * 
 * @returns {Array<Object>} Array of Objects with the header fields as keys and the row as values.
 * 
 * i.e    Col1    | Col2            [{
 *        value1  | value2     ->       Col1:value1, Col2:value2
 *                                  }]
 */
exports.parseCsv = async (pathToFile) => {
    const stream = fs.createReadStream(pathToFile);
    return await neatCsv(stream, {separator: ';'});
}