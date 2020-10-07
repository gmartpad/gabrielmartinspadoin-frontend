import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { doLogin } from '../../helpers/AuthHandler';
import axios from 'axios';
import Cookies from 'js-cookie';
import qs from 'qs';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Form, Input, Button, Label } from './styled';
import { SimpleCircle } from '../../components/partials/Textlike/styled';

import sa from '../../config/server.json';

const Login = () => {

    //----------------------------------------

    const dispatch = useDispatch();

    const setUsuario = (_i, n, i, e, t) => dispatch({
        type: 'SET_USUARIO',
        payload: {
            _id: _i,
            nome_de_usuario: n,
            imagem_de_perfil: i, 
            email: e,
            token: t
        }
    });

    //-----------------------------------------

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [lembrarDaSenha, setLembrarDaSenha] = useState(false);

    const [disabled, setDisabled] = useState(false);

    useEffect(()=>{
        let href = window.location.href;
        let op = window.location.origin+window.location.pathname;
        window.history.replaceState({}, null, op)
        let query = href.split(op+`?`)[1];
        let queryObj = qs.parse(query, { ignoreQueryPrefix: true });
        if(queryObj.c === "1"){
            toast.success("Seu email foi confirmado com sucesso!");
        }
        //---------------------------------------------------------
        let c = Cookies.get('confirmado');
        if(c){
            Cookies.remove('confirmado');
            c = undefined;
            toast.success("Usuário(a) cadastrado(a) com sucesso!");
        }
    }, [])

    const onSubmit = async (e) => {

        e.preventDefault();

        setDisabled(true);

        await axios.post(`${sa.address}/usuarios/autenticar`, {email, senha})
                .then(res => {
                    // alert(`token: ${res.data.token}`)
                    let u = res.data.usuario;
                    let token = res.data.token;
                    setUsuario(u._id, u.nome_de_usuario, u.imagem_de_perfil, u.email, token)
                    u = undefined;
                    doLogin(token);
                    token = undefined;
                    res = null;
                    window.location.href = '/';
                })  
                .catch(err => {
                    toast.error(`Erro: ${err.response.data.erro}`)
                    setDisabled(false);
                })
            
    }

    return (
        <>
            {/* {!logged ? */}
            <> 
                <Form className="login" onSubmit={onSubmit} lang="pt" action="#">
                    <Label htmlFor="email">Email <span>*</span> </Label>
                        <Input 
                            disabled={disabled}
                            required
                            type="email"
                            id="email"
                            value={email}
                            onChange={e=>{
                                    setEmail(e.target.value)
                                    e.target.setCustomValidity('')
                                }
                            }
                            onInvalid={e=>e.target.setCustomValidity('Por favor, preencha o campo com seu email')}
                        />
                    <Label htmlFor="senha">Senha <span>*</span> </Label>
                        <Input 
                            disabled={disabled}
                            required
                            type="password"
                            id="senha"
                            value={senha}
                            onChange={e=>{
                                    setSenha(e.target.value)
                                    e.target.setCustomValidity('')
                                }
                            }
                            onInvalid={e=>e.target.setCustomValidity('Por favor, preencha o campo com sua senha')}
                        />
                        <span className="infoMeta">
                            <div className="lembrarSenhaSpan">
                                <Input 
                                    disabled={disabled}
                                    type="checkbox"
                                    id="lembrarDaSenha"
                                    value={lembrarDaSenha}
                                    onChange={e=>setLembrarDaSenha(e.target.checked)}
                                />
                                <Label 
                                    disabled={disabled}
                                    className="checkbox" 
                                    htmlFor="lembrarDaSenha"
                                >
                                    Lembrar da Senha
                                </Label>
                            </div>
                            <div className="esqueciDiv">
                                <a href="/esqueci-minha-senha" style={{cursor:"pointer"}}>Esqueceu sua senha?</a>
                            </div>
                        </span>
                    {disabled ?
                        <SimpleCircle className="form">
                            <div className="loader simple-circle"></div>
                        </SimpleCircle>
                             :
                        <Button type="submit">Entrar</Button>
                    }
                </Form>
                <ToastContainer/>
            </>        
                    {/* : */}
                {/* <Redirect to="/"/> */}
            {/* } */}
            
        </>
    )
}

export default Login;