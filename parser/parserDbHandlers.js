const Database = require("sqlite-async");
const { AppError } = require("../lib/AppError");

/**
 * Initializes db and creates Cars table
 *
 * @returns {Object} Sqlite db object.
 */

exports.initDb = async () => {
  try {
    const db = await Database.open(":memory:");

    await db.run(`CREATE TABLE cars(
        UUID TEXT PRIMARY KEY,
        Provider TEXT,
        VIN TEXT,
        Make TEXT,
        Model TEXT,
        Mileage REAL,
        Year INTEGER,
        Price REAL,
        'Zip Code' TEXT,
        'Create Date' TEXT,
        'Update Date' TEXT)`);

    return db;
  } catch (err) {
    throw new AppError(err.message, 500);
  }
};

/**
 * Insert Cars into cars table on DB.
 *
 * Receives and array of objects with the fields that we care about and inserts them into a SQLite DB.
 *
 * @param {Array<Object>} cars Array of cars with the columns that we need.
 *
 * @returns {Array<Object>} Array of cars inserted in DB.
 */

exports.insertCars = async (cars) => {
  const db = await this.initDb();
  try {
    let inserts = cars.map((c) => {
      return `INSERT INTO cars('${Object.keys(c).join("','")}') VALUES ('${Object.values(c).join(
        "','"
      )}');`;
    });

    let db_inserts = inserts.map((i) => db.run(i));

    await db.transaction((db) => {
      return Promise.all(db_inserts);
    });

    let inserted_cars = await db.all("SELECT * FROM cars");
    return inserted_cars;
  } catch (err) {
    throw new AppError(err.message, 500);
  } finally {
    db.close();
  }
};
