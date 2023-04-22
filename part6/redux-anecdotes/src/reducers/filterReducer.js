const filterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'FILTER':
            return action.data.filter
        default:
            return state
    }
}

export const filterAction = (value) => {
    return {
    type: 'FILTER',
    data: {
        filter: value
    }}
}

export default filterReducer