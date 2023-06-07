"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnoseService_1 = require("../services/diagnoseService");
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send((0, diagnoseService_1.getDiagnoses)());
});
router.get("/:id", (req, res) => {
    const id = req.params.id;
    try {
        const name = (0, diagnoseService_1.getDiagnoseName)(id);
        res.send(name);
    }
    catch (e) {
        e && typeof e === "object" && "message" in e && typeof e.message === "string"
            ? res.status(400).send(e.message)
            : res.status(400).send("unkown error");
    }
});
exports.default = router;
