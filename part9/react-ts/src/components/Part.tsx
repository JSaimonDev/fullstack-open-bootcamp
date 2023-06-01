import { CoursePart } from "../types"

interface PartProps {
    courseParts: CoursePart[]
}



const Part = ({courseParts}: PartProps) => {
    return (
        <div>
            {courseParts.map( part => {
                switch(part.kind){
                    case "basic":
                        return(
                        <div>
                        <h2>Name: {part.name}</h2>
                        <p>Description: {part.description}</p>
                        </div>
                        )
                    break
                    case "background":
                        return(
                        <div>
                        <h2>Name: {part.name}</h2>
                        <p>Description: {part.description}</p>
                        <p>Background material: {part.backgroundMaterial}</p>
                        </div>
                        )
                    break
                    case "group":
                        return(
                        <div>
                        <h2>Name: {part.name}</h2>
                        <p>Group project count: {part.groupProjectCount}</p>
                        </div>
                        )
                    break
                }
            }
            )}
        </div>

    )
}

export default Part

