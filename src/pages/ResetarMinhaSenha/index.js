import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Form, Input, Label} from '../Login/styled';
import { SpanButton } from '../Cadastrar/styled';
import { SimpleCircle } from '../../components/partials/Textlike/styled';

import sa from '../../config/server.json';

const ResetarMinhaSenha = () => {

    const [email, setEmail] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');

    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(true)
    const [tokenCerto, setTokenCerto] = useState(true);

    //-----------------------------------------------------------

    const onLoad = async (e) => {

        setDisabled(true);

        const token = window.location.pathname.split('/')[2];

        await axios.post(`${sa.address}/usuarios/resetar_minha_senha_teste_usuario`, {token})
                .then(res => {
                    // alert(`token: ${res.data.token}`)
                    setEmail(res.data.email);
                    setDisabled(!res.data.mensagem);
                    if(res.data.mensagem === undefined){
                        setTokenCerto(false);
                        setLoading(false);
                    }
                })  
                .catch(err => {
                    toast.error(`Erro: ${err}`)
                    setDisabled(false);
                    setLoading(false);
                    setTokenCerto(false);
                })

    }

    const onSubmit = async (e) => {

        e.preventDefault();

        if(confirmarNovaSenha !== novaSenha) {
            toast.error(`Erro: O valor de 'Nova senha' está diferente de 'Confirmar nova senha'`);
        }else{

            setDisabled(true);

            const token = window.location.pathname.split('/')[2];

            await axios.post(`${sa.address}/usuarios/resetar_minha_senha`, {email, token, senha: novaSenha})
                    .then(res => {
                        // alert(`token: ${res.data.token}`)
                        toast.success(res.data.mensagem);
                        setNovaSenha('');
                        setConfirmarNovaSenha('');
                        // setDisabled(false);
                        setTimeout(e=>{
                            window.location.href = "/login";
                        }, 5000)
                    })  
                    .catch(err => {
                        toast.error(`Erro: ${err.response.data.erro}`)
                        setDisabled(false);
                    })

        }

    }

    useEffect(()=>{
        onLoad();
    }, [])

    return (
        <>
            {loading ? 
            
                <SimpleCircle className="form" style={{padding: "36vh 30vw"}}>
                    <div className="loader simple-circle"></div>
                </SimpleCircle>
        
                     :

                tokenCerto ?
                     
                    <Form style={{display:'flex', flexDirection:'column'}} action="#">
                        <Label htmlFor="novaSenha">Nova senha</Label>
                        <Input 
                            disabled={disabled}
                            required
                            type="password"
                            id="novaSenha"
                            value={novaSenha}
                            onChange={e=>{
                                    setNovaSenha(e.target.value)
                                    e.target.setCustomValidity('')
                                }
                            }
                            onInvalid={e=>e.target.setCustomValidity('Por favor, preencha o campo com sua senha')}                    
                        />
                        <Label htmlFor="confirmarNovaSenha">Confirmar nova senha</Label>
                        <Input 
                            disabled={disabled}
                            required
                            type="password"
                            id="confirmarNovaSenha"
                            value={confirmarNovaSenha}
                            onChange={e=>{
                                    setConfirmarNovaSenha(e.target.value)
                                    e.target.setCustomValidity('')
                                }
                            }
                            onInvalid={e=>e.target.setCustomValidity('Por favor, preencha o campo com sua senha')}                    
                        />
                                {disabled ?
                                <SimpleCircle className="form">
                                    <div className="loader simple-circle"></div>
                                </SimpleCircle>
                                    :
                                    <SpanButton onClick={onSubmit}>Enviar</SpanButton>
                                }
                    </Form>

                        :
                    
                    <span style={{textAlign: "center", padding: "36vh 30vw"}}>O link clicado é inválido e/ou expirou. Tente gerar um novo link <a href={`${window.location.origin}/esqueci-minha-senha`}>aqui</a></span>

            }
            <ToastContainer/>
        </>
    );
}

export default ResetarMinhaSenha;