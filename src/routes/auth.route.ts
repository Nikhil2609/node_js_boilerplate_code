import express from "express";

const authRouter = express.Router();

authRouter.get("/", (req, res) => {
    res.json({ message: "Login get Route" })
})

authRouter.post("/", (req, res) => {
    res.json({ message: "Login post Route" })
})

export default authRouter;