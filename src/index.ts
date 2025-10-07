import express from "express";
import indexRouter from "./routes";
const app = express();

app.use("/api", indexRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server running on port ${port}`))