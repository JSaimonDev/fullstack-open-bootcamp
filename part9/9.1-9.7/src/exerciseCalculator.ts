interface calculatorResults {
    totalDays: number
    trainingDays: number
    goalAverageHours: number
    calculatedAverageHours: number
    goalIsReached: boolean
    score: number
    scoreMessage: string
}

export type arguments = {
    daysArray:Array<number>
    goalAverageHours: number
};

export const parseExerciseArguments = (args: Array<string>): arguments => {
    if(process.argv.length < 4) throw new Error ('Not enough arguments');

    const a = (): Array<number> => {
        const array = [];
        for(let i=3; i < args.length; i++){
            const toNumber = Number(args[i]);
            if(isNaN(toNumber)) throw new Error ('Arguments are not numbers');
            array[array.length] = toNumber;
        }
        return array;
    };

    const b = Number(args[2]);
    if(isNaN(b)) throw new Error ('Arguments are not numbers');

    return {daysArray: a(), goalAverageHours: b};
};

export const calculateExercise = (daysArray:Array<number>, goalAverageHours: number): calculatorResults => {
     const totalDays = daysArray.length;
     const trainingDays = daysArray.filter(day => day != 0).length;
     const calculatedAverageHours = daysArray.reduce((a,b) => a + b) / totalDays;
     const goalIsReached = () => calculatedAverageHours >= goalAverageHours;
     const hoursIndex = calculatedAverageHours / goalAverageHours;
     const score = (): number => hoursIndex >= 1.5 ? 3 : hoursIndex >= 1 ? 2 : 1;
     const scoreMessage = (): string => {
        return score() === 1 ? "You didn't train enough. Work harder" 
        : score() === 2 ? "Well done. You reached your goal"
        : "Awesome, you trained way more than you had to. But don't go crazy, more is not always better";
     };
     return {
        totalDays: totalDays,
        trainingDays: trainingDays,
        goalAverageHours: goalAverageHours,
        calculatedAverageHours: calculatedAverageHours,
        goalIsReached: goalIsReached(),
        score: score(),
        scoreMessage: scoreMessage()  
     };
};