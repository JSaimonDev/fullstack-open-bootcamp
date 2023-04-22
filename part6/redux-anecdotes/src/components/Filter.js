import { useDispatch } from 'react-redux'
import { filterAction } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
      dispatch(filterAction(event.target.value))
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        Min votes <input type='text' name="filter" onChange={(event) => handleChange(event)} />
      </div>
    )
  }
  
export default Filter