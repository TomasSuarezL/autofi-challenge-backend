const app = require("../server");
const supertest = require("supertest");

test("POST /parser/csv", async () => {
    await supertest(app).post("/parser/csv")
        .attach('data', 'tests/data.csv')
        .field('provider', 'Test')
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.length).toBe(11);
            expect(Object.keys(response.body[0]).length).toBe(11)
            expect(response.body[0].Provider).toBe('Test')
        });
});

test("POST /parser/csv file with 2 extra columns (not desired). Should Ignore them", async () => {
    await supertest(app).post("/parser/csv")
        .attach('data', 'tests/dataWith2ExtraFields.csv')
        .field('provider', 'Test')
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.length).toBe(11);
            expect(Object.keys(response.body[0]).length).toBe(11)
            expect(response.body[0].Provider).toBe('Test')
        });
});

test("POST /parser/csv file with fewer columns (2, Mileage and Year). Should be null", async () => {
    await supertest(app).post("/parser/csv")
        .attach('data', 'tests/dataWith2LessFields.csv')
        .field('provider', 'Test')
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.length).toBe(11);
            expect(Object.keys(response.body[0]).length).toBe(11)
            expect(response.body[0].Provider).toBe('Test')
            expect(response.body[0].Mileage).toBe(null)
            expect(response.body[0].Year).toBe(null)
        });
});

test("POST /parser/csv file without rows. Should be empty", async () => {
    await supertest(app).post("/parser/csv")
        .attach('data', 'tests/emptyData.csv')
        .field('provider', 'Test')
        .expect(200)
        .then(async (response) => {
            // Check the response
            expect(response.body.length).toBe(0);
        });
});


test("POST /parser/csv without file", async () => {
    await supertest(app).post("/parser/csv")
        .attach('data', '')
        .field('provider', 'Test')
        .expect(400)
});

test("POST /parser/csv wrong file field name", async () => {
    await supertest(app).post("/parser/csv")
        .attach('csv', 'tests/data.csv')
        .field('provider', 'Test')
        .expect(400)
});

test("POST /parser/csv without file", async () => {
    await supertest(app).post("/parser/csv")
        .attach('data', '')
        .field('provider', '')
        .expect(400)
});

test("POST /parser/csv wrong provider field name", async () => {
    await supertest(app).post("/parser/csv")
        .attach('csv', 'tests/data.csv')
        .field('provi', 'Test')
        .expect(400)
});