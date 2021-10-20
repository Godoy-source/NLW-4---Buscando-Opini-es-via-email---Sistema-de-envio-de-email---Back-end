import request from "supertest";
import { app } from "../app";

import createConnection from "../database";

describe("teste", () => {
    it("deve ser possivel somar 2 numeros", () => {
        expect(2 + 2).toBe(5);
    })
})

describe("User", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });
    it("Sould be able to create a new user", async () => {
        const response = await request(app).post("/users").send({
            email: "user@example.com",
            name: "User Test"
        })
        expect(response.status).toBe(201);
    });
});