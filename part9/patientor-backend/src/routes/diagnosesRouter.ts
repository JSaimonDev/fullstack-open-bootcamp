import express from "express";
import { getDiagnoses, getDiagnoseName } from "../services/diagnoseService";

const router = express.Router();

router.get("/", (_req, res) => {
    res.send(getDiagnoses());
});

router.get("/:id", (req,res) => {
    const id = req.params.id;
    try{
    const name = getDiagnoseName(id);
    res.send(name);
    }catch(e){
    e && typeof e === "object" && "message" in e && typeof e.message === "string"
    ? res.status(400).send(e.message)
    : res.status(400).send("unkown error");
    }
});

export default router;