import diagnosesData from '../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnosesData as Diagnose[];
  
export const getDiagnoses = (): Array<Diagnose> => {
        return diagnoses;
};

export const getDiagnoseName = (id: unknown): string => {
        if(typeof id === "string"){
                const diagnoseFound = diagnoses.find(diagnose => {
                       return diagnose.code === id;
                });
                if(diagnoseFound){
                        return diagnoseFound.name;
                }
                else throw new Error ('Wrong id');               
        }
        else throw new Error ('Wrong id');
};