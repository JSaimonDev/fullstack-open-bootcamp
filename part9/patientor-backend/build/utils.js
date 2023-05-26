"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return (typeof text === "string" || text instanceof String);
};
const parseName = (name) => {
    if (!isString(name) || !name) {
        throw new Error("Incorrect or missing name");
    }
    return name;
};
const parseSsn = (ssn) => {
    if (!isString(ssn) || !ssn) {
        throw new Error("Incorrect or missing ssn");
    }
    return ssn;
};
const isDate = (date) => {
    return isNaN(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date");
    }
    return date;
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).toString().includes(gender);
};
const parseGender = (gender) => {
    if (!gender || typeof gender !== "string" || !isGender(gender)) {
        throw new Error("Incorrect or missing gender");
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation");
    }
    return occupation;
};
const toNewPatientEntry = (object) => {
    if (!object || typeof object != "object")
        throw new Error("Incorrect or missing data");
    if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object) {
        const newPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        };
        return newPatient;
    }
    throw new Error("Incorrect data, some fields are missing");
};
exports.toNewPatientEntry = toNewPatientEntry;
