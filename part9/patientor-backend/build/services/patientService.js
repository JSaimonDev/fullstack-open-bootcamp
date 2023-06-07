"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewPatient = exports.getPatientDetails = exports.getPatients = void 0;
const patients_1 = __importDefault(require("../data/patients"));
const uuid_1 = require("uuid");
const patientsNoSSN = patients_1.default;
const patients = patients_1.default;
const getPatients = () => {
    return patientsNoSSN;
};
exports.getPatients = getPatients;
const getPatientDetails = (req) => {
    let patientFound = patients.find(patient => patient.id === req.params.id);
    if (patientFound && !patientFound.entries)
        patientFound = Object.assign(Object.assign({}, patientFound), { entries: [] });
    if (patientFound)
        return patientFound;
    throw new Error('Invalid request');
};
exports.getPatientDetails = getPatientDetails;
const addNewPatient = (entry) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    return newPatient;
};
exports.addNewPatient = addNewPatient;
