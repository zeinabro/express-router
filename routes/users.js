const express = require("express")
const User = require("../models/User")

const usersRouter = express.Router()

usersRouter.use(express.json())
usersRouter.use(express.urlencoded())

usersRouter.get("/", async(req,res) => {
    const users = await User.findAll()
    res.json(users)
})

usersRouter.get("/:id", async(req,res) => {
    const user = await User.findByPk(req.params.id)
    res.json(user)
})

usersRouter.post("/", async(req,res) => {
    const user = await User.create({
        name: req.body.name,
        age: req.body.age
    })
    res.json(user)
})

usersRouter.put("/:id", async(req,res) => {
    await User.update(
        {
            name: req.body.name,
            age: req.body.age
        },
        {
            where:{
                id: req.params.id
            }
        }
    )
    const user = await User.findByPk(req.params.id)
    res.json(user)
})

usersRouter.delete("/:id", async(req,res) => {
    await User.destroy(
        {
            where:{
                id: req.params.id
            }
        }
    )
    res.send("User deleted successfully")
})

module.exports = usersRouter