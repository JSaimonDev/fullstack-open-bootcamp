import diagnosesData from '../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Diagnose[] = diagnosesData as Diagnose[];
  
export const getDiagnoses = (): Array<Diagnose> => {
        return diagnoses;
};