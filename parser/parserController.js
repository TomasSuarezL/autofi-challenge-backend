const config = require("../config.json");
const { insertCars } = require("./parserDbHandlers");
const { parseCsv } = require("./parserHandlers");
const { AppError } = require("../lib/AppError");

exports.parse_csv = async (req, res, next) => {
  try {
    if (!req.file) {
        throw new AppError("File could not be uploaded.", 400)
    }

    if (!req.body.provider) {
        throw new AppError("File Provider was not sent or is badly formed.", 400)
    }
    const parsedCsv = await parseCsv(req.file.path);

    // ToDo: Extract Car logic to Car module
    let cars = parsedCsv.map((r) => {
      let entries = Object.entries(r);
      let filtered = entries.filter((v) => config.columns.includes(v[0]));
      return { ...Object.fromEntries(filtered), Provider: req.body.provider };
    });

    let inserted_cars = insertCars(cars);
    res.send(inserted_cars);
  } catch (err) {
    next(err);
  }
};
