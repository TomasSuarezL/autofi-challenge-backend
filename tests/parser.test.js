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