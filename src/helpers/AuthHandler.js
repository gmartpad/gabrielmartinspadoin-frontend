import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';

export const isLogged = () => {
    let token = Cookies.get('token');
    return (token) ? true : false;
}

export const doLogin = (token, rememberPassword = false) => {
    if(rememberPassword){
        Cookies.set('token', token, { expires:999 });
    }else{
        Cookies.set('token', token);
    }
}

export const doLogout = () => {
    Cookies.remove('token');
}

export const isAdmin = () => {

    const u = useSelector(state => state.usuario);
    return u._id === '5f5efa2454ac913120e1d7f1' ? true : false;

}