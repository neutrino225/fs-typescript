import { CourseContent } from "../types"


const Total = ({courseParts} : {courseParts : CourseContent[]}) => {
    return (
        <p>
        Number of exercises{" "}
        <strong>{courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</strong>
      </p>
    )
}

export default Total