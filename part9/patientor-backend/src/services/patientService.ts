import patientData from "../data/patients";
import { PatientNoSSN, NewPatientEntry, Patient } from "../types";
import { v1 as uuid } from 'uuid';
import express from 'express';


const patientsNoSSN: PatientNoSSN[] = patientData as PatientNoSSN[];
const patients: Patient[] = patientData;


export const getPatients = () => {
    return patientsNoSSN;
};

export const getPatientDetails = (req: express.Request): Patient => {
    let patientFound = patients.find(patient => patient.id === req.params.id);
    if(patientFound && !patientFound.entries) patientFound = {
        ...patientFound,
        entries: []
    };
    if (patientFound) return patientFound;
    throw new Error ('Invalid request');
};

export  const addNewPatient = (entry: NewPatientEntry): Patient => {
    const newPatient = {
        id: uuid(),
        ...entry
    };
    return newPatient as Patient;
};