import express from "express";
import { addRegister, getRegister } from "../controllers/register.controller";
const route = express.Router()

route.post("/add-data", addRegister)
route.get("/get-data", getRegister)

export default route