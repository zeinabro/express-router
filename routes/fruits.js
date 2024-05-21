const express = require("express")
const Fruit = require("../models/Fruit")
const { check, validationResult } = require("express-validator")

const fruitRouter = express.Router()
fruitRouter.use(express.json())
fruitRouter.use(express.urlencoded())

fruitRouter.get("/", async(req,res) => {
    const fruits = await Fruit.findAll();
    res.json(fruits)
})

fruitRouter.get("/:id", async(req,res) => {
    const fruit = await Fruit.findByPk(req.params.id)
    res.json(fruit)
})

const validator = [
    check("color").trim().not().isEmpty()
]

fruitRouter.post("/",validator, async(req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        res.status(400).json({ error: errors.array() })
    } else {
       const fruit = await Fruit.create({
        name: req.body.name,
        color: req.body.color
       })
       res.json(fruit)
    }
})

fruitRouter.put("/:id", validator, async(req,res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        res.status(400).json({ error: errors.array() })
    } else {
        await Fruit.update(
        {
            name: req.body.name,
            color: req.body.color
        },
        {
            where: {
                id: req.params.id
            }
        })
        const fruit = await Fruit.findByPk(req.params.id)
        res.json(fruit)
    }
})

fruitRouter.delete("/:id", async(req,res) => {
    await Fruit.destroy(
        {
            where: {
                id: req.params.id
            }
        }
    )
    res.send("Fruit deleted successfully")
})

module.exports = fruitRouter