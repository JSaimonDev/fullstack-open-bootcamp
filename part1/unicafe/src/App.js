import { useState } from "react";

const Statistics = ({ good, neutral, bad }) => {
  if (good || neutral || bad) {
    return (
      <div>
        {/* <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
        <p>All {good + neutral + bad}</p>
        <p>Average {(good + neutral + bad) / 3}</p>
        <p>Positive {(good / (good + neutral + bad)) * 100}%</p> */}
        <StatisticLine text="Good" formula={good} />
        <StatisticLine text="Neutral" formula={neutral} />
        <StatisticLine text="Bad" formula={bad} />
        <StatisticLine text="All" formula={good + neutral + bad} />
        <StatisticLine text="Average" formula={(good + neutral + bad) / 3} />
        <StatisticLine
          text="Positive"
          formula={(good / (good + neutral + bad)) * 100}
        />
      </div>
    );
  } else {
    return (
      <div>
        <p>No statistics given</p>
      </div>
    );
  }
};

const Button = ({ type, set, text }) => {
  return <button onClick={() => set(type + 1)}>{text}</button>;
};

const StatisticLine = ({ text, formula }) => {
  return (
    <p>
      {text} {formula}
    </p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <p>
        <Button text="Good" type={good} set={setGood} />
        <Button text="Neutral" type={neutral} set={setNeutral} />
        <Button text="Bad" type={bad} set={setBad} />
      </p>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
