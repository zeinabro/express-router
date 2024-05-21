const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { describe, test, expect } = require("@jest/globals")
const app = require("./src/app")
const { seedUsers, seedFruits } = require("./seedData")

describe("/users endpoint", () => {
    test("get all users", async() => {
        const res = await request(app).get("/users")
        expect(res.statusCode).toBe(200)
        expect(res.body[0].name).toEqual(seedUsers[0].name)
        expect(res.body.length).toBe(seedUsers.length)
    })

    test("get user by id", async() => {
        const res = await request(app).get("/users/1")
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual(seedUsers[0].name)
    })

    test("create new user", async() => {
        const user = {
            name: "Zeinab",
            age: 20
        }
        const res = await request(app).post("/users").send(user)
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual(user.name)
    })

    test("update existing user", async() => {
        const user = {
            name: "Testing",
            age: 21
        }
        const res = await request(app).put("/users/4").send(user)
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual(user.name)
        expect(res.body.age).toEqual(user.age)
    })

    test("delete user", async() => {
        const res = await request(app).delete("/users/4")
        expect(res.statusCode).toBe(200)
        expect(res.text).toEqual("User deleted successfully")
    })
})