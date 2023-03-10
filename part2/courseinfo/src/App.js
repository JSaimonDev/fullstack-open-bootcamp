const Header = ({ name }) => <h1>{name}</h1>;

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((parts) => (
        <Part name={parts.name} exercises={parts.exercises} key={parts.id} />
      ))}
    </div>
  );
};

const Part = ({ name, exercises, id }) => {
  return (
    <p key={id}>
      {name} {exercises}
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
