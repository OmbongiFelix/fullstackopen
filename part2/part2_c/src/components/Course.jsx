
const Totals = ({ course }) => {
  console.log(course.parts)
  const sum = course.parts.reduce(
    (total, part) => total + part.exercises,
    0
  )

  return (
    <p>
      <strong>Total exercises: {sum}</strong>
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      {course.map(course => (
        <div key={course.id}>
          <h2>{course.name}</h2>

          <ul>
            {course.parts.map(part => (
              <li key={part.id}>
                {part.name} {part.exercises}
              </li>
            ))}
          </ul>
        <Totals course={course} />
        </div>
      ))}
    </div>
  )
}

export default Course