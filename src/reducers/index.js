import { combineReducers } from 'redux';

import ApiReducer from './ApiReducer';
import ChuckReducer from './ChuckReducer';
import KanyeReducer from './KanyeReducer';
import CertificadosReducer from './CertificadosReducer';
import UsuarioReducer from './UsuarioReducer'

export default combineReducers({
    api: ApiReducer,
    chuck: ChuckReducer,
    kanye: KanyeReducer,
    certificados: CertificadosReducer,
    usuario: UsuarioReducer
});