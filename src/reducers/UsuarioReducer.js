const initialState = {
    _id: '',
    nome_de_usuario: '',
    imagem_de_perfil: 'pfp_padrao.jpg',
    email: '',
    token: ''
}

const UsuarioReducer = (state = initialState, action) => {

    switch(action.type) {
        case 'SET_USUARIO':
            return { ...state,
                _id: action.payload._id,
                nome_de_usuario: action.payload.nome_de_usuario,
                imagem_de_perfil: action.payload.imagem_de_perfil,
                email: action.payload.email,
                token: action.payload.token
            }
        default:
            break;
    }

    return state;

}

export default UsuarioReducer;