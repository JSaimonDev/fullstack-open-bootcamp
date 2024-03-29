"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = require("../services/patientService");
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('', (_req, res) => {
    res.send((0, patientService_1.getPatients)());
});
router.get('/:id', (req, res) => {
    try {
        const patientDetails = (0, patientService_1.getPatientDetails)(req);
        res.send(patientDetails);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.post('', (req, res) => {
    try {
        const newPatientEntry = (0, utils_1.toNewPatientEntry)(req);
        const addedPatient = (0, patientService_1.addNewPatient)(newPatientEntry);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
