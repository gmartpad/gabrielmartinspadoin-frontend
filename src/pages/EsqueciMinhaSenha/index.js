import React, { useState } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Form, Input, Label } from '../Login/styled';
import { SpanButton } from '../Cadastrar/styled';
import { SimpleCircle } from '../../components/partials/Textlike/styled';
import { EMSDiv } from './styled';

import sa from '../../config/server.json';

const EsqueciMinhaSenha = () => {
    
    const [email, setEmail] = useState('');

    const [disabled, setDisabled] = useState(false);

    //----------------------------------------------

    const onSubmit = async (e) => {

        e.preventDefault();

        setDisabled(true);

        await axios.post(`${sa.address}/usuarios/esqueci_minha_senha`, {email})
                .then(res => {
                    // alert(`token: ${res.data.token}`)
                    toast.success(`${res.data.mensagem}`);
                    setTimeout(e=>{
                        window.location.href = "/login";
                    }, 5000)
                })  
                .catch(err => {
                    if(err.response !== undefined){
                        toast.error(`Erro: ${err.response.data.erro}`)
                    }else{
                        toast.error(`Houve um erro inesperado. Tente novamente mais tarde.`)
                    }
                    setDisabled(false);
                })

        setDisabled(false);

    }    

    return (
        <EMSDiv>
            <Form style={{display:'flex', flexDirection:'column'}} action="#">
                <Label htmlFor="email">Seu email</Label>
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
                    {disabled ?
                    <SimpleCircle className="form">
                        <div className="loader simple-circle"></div>
                    </SimpleCircle>
                         :
                         <SpanButton onClick={onSubmit}>Enviar</SpanButton>
                    }
            </Form>
            <ToastContainer/>
        </EMSDiv>
    );
}

export default EsqueciMinhaSenha;