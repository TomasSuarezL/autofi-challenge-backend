const csv = require('csv-parser')
const fs = require('fs');
const { insert_cars } = require('../data/db');
const config = require('../config.json');


exports.parse_csv = function (req, res, next) {
    try {
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            let cars = results.map(r => {
                let entries = Object.entries(r)
                let filtered = entries.filter(v => config.columns.includes(v[0]));
                return { ...Object.fromEntries(filtered), Provider: req.body.provider }
            })
            let inserted_cars = await insert_cars(cars);
            res.send(inserted_cars);
        })
        .on("error", (err) => {
            next({status: 400, err});
        });
    } catch(err) {
        next({status: 400, message: err.message, stack: err.stack});
    }
};
