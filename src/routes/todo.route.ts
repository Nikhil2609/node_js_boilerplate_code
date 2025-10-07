import express from "express";

const todoRouter = express.Router();

todoRouter.get("/", (req, res) => {
    res.json({ message: "Todo get Route" })
})

todoRouter.post("/", (req, res) => {
    res.json({ message: "Todo post Route" })
})

export default todoRouter;