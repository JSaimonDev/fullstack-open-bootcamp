const Header = ({ name }) => <h1>{name}</h1>;

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((parts) => (
        <Part name={parts.name} exercises={parts.exercises} key={parts.id} />
      ))}
      <Total parts={parts} />
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

const SingleCourse = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};
const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((courses) => (
        <SingleCourse course={courses} key={courses.id} />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((a, c) => a + c.exercises, 0);
  return <div>Total of {total} exercises</div>;
};

export default Courses;
