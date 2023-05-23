import express from "express";
import { calculateBmi, parseBmiArguments } from "./bmiCalculator";
import { calculateExercise} from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("",(_req,res) => {
    res.send('Hello Full Stack!');
});

app.get("/bmi", (req,res) => {
    try {
        const { weight, height } = parseBmiArguments({ weight: req.query.weight as string, height: req.query.height as string});
        const bmi = calculateBmi(weight, height);
        res.send({
            weight: weight,
            height: height,
            bmi: bmi
        });
    } catch (e) {
        if (e instanceof Error) res.send({ error: e.message });
        else res.send({ error: "malformatted parameters"});
    }
});

app.post("/exercises", (req,res) => {
    console.log(req.body);
    try {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
        const { daily_exercises, target } : { daily_exercises: Array<number>, target: number}  = req.body;
        if(!daily_exercises || !target) throw new Error ("Missing arguments");
        if(isNaN(Number(target))) throw new Error ("target is not a number");
        if(!Array.isArray(daily_exercises) || !daily_exercises.every(n => typeof n == 'number')) throw new Error ("daily_exercises is not an array of numbers");
        const result = calculateExercise(daily_exercises, target);
        res.send(result);
    } catch (e) {
        if (e instanceof Error){ 
        res.status(400).send({ error: e.message });
        }
        else {
        res.status(400).send({ error: "malformatted parameters"});
        }
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});