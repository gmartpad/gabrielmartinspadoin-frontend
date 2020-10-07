const initialState = {
    loading: true,
}

const ApiReducer = (state = initialState, action) => {

    switch(action.type){
        case 'SET_API_LOADING':
            return {...state, loading: action.payload.loading}
        default:
            break;
    }

    return state;

}

export default ApiReducer;