"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewPatient = exports.getPatients = void 0;
const patients_json_1 = __importDefault(require("../data/patients.json"));
const uuid_1 = require("uuid");
const patients = patients_json_1.default;
const getPatients = () => {
    return patients;
};
exports.getPatients = getPatients;
const addNewPatient = (entry) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    return newPatient;
};
exports.addNewPatient = addNewPatient;
