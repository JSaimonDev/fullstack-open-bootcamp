interface bmiArguments {
    weight: string
    height: string
}

export const parseBmiArguments = (args: bmiArguments) => {
    if(!args.weight || !args.height) throw new Error ("Missing arguments");

    const weight = Number(args.weight);
    const height = Number(args.height);

    if(isNaN(weight) || isNaN(height)) throw new Error ('Arguments are not numbers');

    return {
        weight: weight,
        height: height
    };
}; 

export const calculateBmi = (weight: number, height: number): string => {
    const bmi = weight / (height * height);
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 25) {
        return "Normal (healthy weight)";
    } else if (bmi < 30) {
        return "Overweight";
    } else {
        return "Obese";
    }
};