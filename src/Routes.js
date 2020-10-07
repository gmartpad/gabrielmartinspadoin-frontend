import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, useLocation} from 'react-router-dom';
import { isAdmin } from './helpers/AuthHandler';
import { PaddingCont } from './components/MainComponents';

import RouteHandler from './components/RouteHandler';

import APIs from './pages/APIs';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Sobre from './pages/Sobre';
import Certificados from './pages/Certificados';
import Cadastrar from './pages/Cadastrar';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import EsqueciMinhaSenha from './pages/EsqueciMinhaSenha';
import ResetarMinhaSenha from './pages/ResetarMinhaSenha';
import CriarPost from './pages/CriarPost';
import EditarPost from './pages/EditarPost';
import Post from './pages/Post';

export default () => {

    const location = useLocation();
    const dispatch = useDispatch();

    const setAPILoading = (newAPILoading) => dispatch({
        type: 'SET_API_LOADING',
        payload: {
            loading: newAPILoading,
        }
    });

    useEffect(() => {
        setAPILoading(true);
    }, [location]);

    let admin = isAdmin();

    return (
        <PaddingCont>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route exact path="/sobre">
                    <Sobre/>
                </Route>
                <Route exact path="/apis">
                    <APIs/>
                </Route>
                <Route exact path="/cadastre-se">
                    <Cadastrar/>
                </Route>
                <RouteHandler private exact path="/perfil">
                    <Perfil/>
                </RouteHandler>
                <RouteHandler public exact path="/login">
                    <Login/>
                </RouteHandler>
                <RouteHandler public exact path="/esqueci-minha-senha">
                    <EsqueciMinhaSenha/>
                </RouteHandler>
                <RouteHandler public exact path="/resetar-minha-senha/:token">
                    <ResetarMinhaSenha/>
                </RouteHandler>
                <Route exact path="/post/:slug">
                    <Post/>
                </Route>
                {admin && 
                    <>
                        <RouteHandler private exact path="/posts/criar">
                            <CriarPost/>
                        </RouteHandler>
                        <RouteHandler private exact path="/posts/editar/:slug">
                            <EditarPost/>
                        </RouteHandler>
                        <RouteHandler private exact path="/certificados/criar">
                            <Certificados/>
                        </RouteHandler>
                    </>
                }
                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </PaddingCont>
    );
}