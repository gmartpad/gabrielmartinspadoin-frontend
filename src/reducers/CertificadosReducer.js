const initialState = {
    open: false,
}

const CertificadosReducer = (state = initialState, action) => {

    switch(action.type) {
        case 'SET_CERT_OPEN':
            return {...state, open: action.payload.open}
        default:
            break;
    }

    return state;

}

export default CertificadosReducer;