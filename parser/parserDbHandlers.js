const Database = require("better-sqlite3");
const { AppError } = require("../lib/AppError");

/**
 * Initializes db and creates Cars table
 *
 * @returns {Object} Sqlite db object.
 */

exports.initDb = () => {
  try {
    const db = new Database(":memory:", { verbose: console.log });

    const create_table_stmt = db.prepare(`CREATE TABLE cars(
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

    create_table_stmt.run();

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

exports.insertCars = (cars) => {
  const db = this.initDb();
  try {
    let inserts = cars.map((c) => {
      return db.prepare(
        `INSERT INTO cars('${Object.keys(c).join("','")}') VALUES ('${Object.values(c).join(
          "','"
        )}');`
      );
    });

    const insertMany = db.transaction(() => {
      for (const insert of inserts) insert.run();
    });

    insertMany();

    let select_cars_stmt = db.prepare("SELECT * FROM cars");
    const inserted_cars = select_cars_stmt.all()
    return inserted_cars;

  } catch (err) {
    throw new AppError(err.message, 500);
  } finally {
    db.close();
  }
};
