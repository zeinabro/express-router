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

    test("create new user with valid info", async() => {
        const user = {
            name: "Zeinab",
            age: 20
        }
        const res = await request(app).post("/users").send(user)
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual(user.name)
    })

    test("cannot create new user with invalid info", async() => {
        const user = {
            name: " ",
            age: 20
        }
        const res = await request(app).post("/users").send(user)
        expect(res.statusCode).toBe(400)
        expect(res.body.error[0]).toEqual(
            {
                "value": "",
                "msg": "Invalid value",
                "param": "name",
                "location": "body"
            }
        )
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

describe("/fruits endpoint", () => {
    test("get all fruits", async() => {
        const res = await request(app).get("/fruits")
        expect(res.statusCode).toBe(200)
        expect(res.body[0].name).toEqual(seedFruits[0].name)
        expect(res.body.length).toBe(seedFruits.length)
    })

    test("get fruit by id", async() => {
        const res = await request(app).get("/fruits/1")
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual(seedFruits[0].name)
    })

    test("create new fruit with valid info", async() => {
        const fruit = {
            name: "Fruit",
            color: "color"
        }
        const res = await request(app).post("/fruits").send(fruit)
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual(fruit.name)
    })

    test("cannot create new fruit with invalid info", async() => {
        const fruit = {
            name: "fruit",
            color: ""
        }
        const res = await request(app).post("/fruits").send(fruit)
        expect(res.statusCode).toBe(400)
        expect(res.body.error[0]).toEqual(
            {
                "value": "",
                "msg": "Invalid value",
                "param": "color",
                "location": "body"
            }
        )
    })

    test("update existing fruit", async() => {
        const fruit = {
            name: "Testing",
            color: "test"
        }
        const res = await request(app).put("/fruits/4").send(fruit)
        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual(fruit.name)
        expect(res.body.color).toEqual(fruit.color)
    })

    test("delete fruit", async() => {
        const res = await request(app).delete("/fruits/4")
        expect(res.statusCode).toBe(200)
        expect(res.text).toEqual("Fruit deleted successfully")
    })
})