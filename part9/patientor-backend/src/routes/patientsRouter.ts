import express from "express";
import { getPatients, addNewPatient } from "../services/patientService";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get('', (_req, res) => {
    res.send(getPatients());
});

router.post('', (req, res) => {
    try{
    const newPatientEntry = toNewPatientEntry(req);
    const addedPatient = addNewPatient(newPatientEntry);
    res.json(addedPatient);
    }
    catch(error:unknown){
        let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
    }
});

export default router;