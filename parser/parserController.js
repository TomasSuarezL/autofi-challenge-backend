const config = require("../config.json");
const { insertCars } = require("./parserDbHandlers");
const { parseCsv } = require("./parserHandlers");

exports.parse_csv = async (req, res, next) => {
  try {
    const parsedCsv = await parseCsv(req.file.path);

    // ToDo: Extract Car logic to Car module
    let cars = parsedCsv.map((r) => {
      let entries = Object.entries(r);
      let filtered = entries.filter((v) => config.columns.includes(v[0]));
      return { ...Object.fromEntries(filtered), Provider: req.body.provider };
    });

    let inserted_cars = await insertCars(cars);
    res.send(inserted_cars);
  } catch (err) {
    next({ status: 400, message: err.message, stack: err.stack });
  }
};
