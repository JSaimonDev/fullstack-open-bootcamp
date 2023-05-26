import patientData from "../data/patients.json";
import { PatientNoSSN, NewPatientEntry, Patient } from "../types";
import { v1 as uuid } from 'uuid';


const patients: PatientNoSSN[] = patientData as PatientNoSSN[];


export const getPatients = () => {
    return patients;
};

export  const addNewPatient = (entry: NewPatientEntry): Patient => {
    const newPatient = {
        id: uuid(),
        ...entry
    };
    return newPatient as Patient;
};
