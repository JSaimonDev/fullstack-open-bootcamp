import { NewPatientEntry, Gender} from './types';

const isString = (text: unknown): text is string => {
    return (typeof text === "string" || text instanceof String);
};


const parseName = (name: unknown): string => {
    if(!isString(name) || !name){
        throw new Error ("Incorrect or missing name");
    }
        return name;
};

const parseSsn = (ssn: unknown): string => {
    if(!isString(ssn) || !ssn){
        throw new Error ("Incorrect or missing ssn");
    }
    return ssn;
};

const isDate = (date: string): boolean => {
    return isNaN(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)){
        throw new Error ("Incorrect or missing date");
    }
        return date;
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).toString().includes(gender);
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || typeof gender !== "string"|| !isGender(gender)){
        throw new Error ("Incorrect or missing gender");
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)){
        throw new Error ("Incorrect or missing occupation");
    }
    return occupation;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    if (!object || typeof object != "object") throw new Error ("Incorrect or missing data");

    if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object){
    const newPatient= {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    };
    return newPatient;
}

    throw new Error ("Incorrect data, some fields are missing");
};
