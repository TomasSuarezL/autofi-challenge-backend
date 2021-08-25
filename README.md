## Coding Challenge - Autofi - Backend

### Task

Build an API with a single endpoint that accepts a file upload in the CSV format and the provider
name that sent the file, looks up a configuration defining the column layout and parses the CSV
into either a file or - as a stretch goal - into an in-memory database.

### Solution

To solve this challenge, I wrote an express API that exposes a single endpoint `/parser/csv` that receives a CSV file with different column layouts and the name of the provider, and parses the file to an Array of objects that are stored in a SQLite in-memory DB.
The packages that I used, aside express, are:

- `multer` for file uploading
- `csv-parser` to parse the CSV file
- `sqlite-async` to handle interactions with SQLite db asynchronously
- `jest` and `supertest` for testing

### Running the Solution

To start the server:

```
npm install
npm start
```

To run the tests:

```
npm run test
```

### Endpoints

The only endpoint is `/parser/csv`. We should provide the file and provider as a `multipart/form-data` content type with keys of `data` and `provider` respectively.

### Assumptions

The configuration of columns is used just to filter extra columns that may be provided in the file. This just makes it easier to form the insert row strings:

```javascript
let inserts = cars.map((c) => {
  return `INSERT INTO cars('${Object.keys(c).join("','")}') VALUES ('${Object.values(c).join(
    "','"
  )}');`;
});
```

without having to "hardcode" the column names and values. On the other hand, to create the cars table, all the fields are "harcoded" based on the desired column layout provided. The column configuration is defined in a JSON named `config.json` in the project root, that has a `columns` key with a array of strings (representing the column names) as value.

```
{
    "columns": [
        "UUID",
        "VIN",
        "Make",
        "Model",
        "Mileage",
        "Year",
        "Price",
        "Zip Code",
        "Create Date",
        "Update Date"
    ]
}
```

Regarding the database, I assumed that we would want to receive a CSV file, parse it and store it in a single table. For that reason I add the provider column to the entries before inserting them. The result would be a single table containg the data from all the received files.
Note: the in-memory db is closed after each request to prevent memory leaks, so this functionality isn´t fully implemented as explained. The simplest solution would be delaying db.close() to server shut down.

### ToDos

- :heavy_check_mark: ~~Change Project Organization to feature based~~.
- :heavy_check_mark: ~~Change CSV reader to async~~
- :heavy_check_mark: ~~Add more tests~~
- Extract Car logic to Car module
