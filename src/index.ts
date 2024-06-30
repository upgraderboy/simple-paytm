import { ErrorRequestHandler, Request, Response } from "express";
import app from "./app";
import connectDB from "./utils/db";
import ErrHandler from "./middlewares/ErrHandlers";
import { configDotenv } from "dotenv";
configDotenv()
const PORT = process.env.PORT || 7000;
const dbUrl = process.env.DB_URL;

// middlewares
app.use(ErrHandler)

app.listen(PORT, async ()=>{
    console.log(`Server is running on PORT: ${PORT}`);
    const res = await connectDB(dbUrl)
    console.log(res.message);
})