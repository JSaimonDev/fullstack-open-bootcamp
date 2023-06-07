"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiagnoseName = exports.getDiagnoses = void 0;
const diagnoses_json_1 = __importDefault(require("../data/diagnoses.json"));
const diagnoses = diagnoses_json_1.default;
const getDiagnoses = () => {
    return diagnoses;
};
exports.getDiagnoses = getDiagnoses;
const getDiagnoseName = (id) => {
    if (typeof id === "string") {
        const diagnoseFound = diagnoses.find(diagnose => {
            return diagnose.code === id;
        });
        if (diagnoseFound) {
            return diagnoseFound.name;
        }
        else
            throw new Error('Wrong id');
    }
    else
        throw new Error('Wrong id');
};
exports.getDiagnoseName = getDiagnoseName;
