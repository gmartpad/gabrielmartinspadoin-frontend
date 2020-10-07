const initialState = {
    loading: false,
};

const KanyeReducer = (state = initialState, action) => {

    switch(action.type) {
        case 'SET_KANYE_LOADING':
            return {...state, loading: action.payload.loading}
        default:
            break;
    }

    return state;

}

export default KanyeReducer;