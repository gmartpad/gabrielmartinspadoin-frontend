import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ReactTooltip from 'react-tooltip';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { Form, Input, Button, Label, Image, SpanPFP } from '../Login/styled'
import { SpanButton, SenhaTooltip } from './styled';
import { SimpleCircle } from '../../components/partials/Textlike/styled';

import pfp from '../../config/pfp.json';
import sa from '../../config/server.json';

const Cadastrar = () => {

    //----------------------------------------

    const [nome_de_usuario, setNome_De_Usuario] = useState('');
    // eslint-disable-next-line
    const [constNome_PFP, setConstNome_PFP] = useState('');
    const [nome_PFP, setNome_PFP] = useState(undefined);
    const [pfp_src, setPFP_SRC] = useState(pfp.base64);
    const [imagem_de_perfil, setImagem_de_Perfil] = useState('');
    const [file, setFile] = useState();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    // eslint-disable-next-line
    const [senhaRegex, setSenhaRegex] = useState(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))
    const [senhaValida, setSenhaValida] = useState(false);

    const [disabled, setDisabled] = useState(false);
    const [limpaDisabled, setLimpaDisabled] = useState(false);

    let senhaTooltip = 'A senha deve conter, no mínimo, 8 caracteres e dentre esses deve possuir: Um caractere maiúsculo, um minúsculo, um especial (ex.: !@#$%^&*) e um número.';

    const inputImage = useRef(null);

    const checkFileSize = (target) => {
        if(target.files[0] !== undefined){
            if(target.files[0].size > 4194304){
                toast.error('Erro: Tamanho do arquivo excedeu o limite. Tente um mais leve');
                if(!target.value === undefined){
                    //nada
                }else{
                    target.value = ""
                    setImagem_de_Perfil(pfp.base64)
                    checkImgPer();
                }
            }else{
                imagemDePerfilFile(target.files[0])
                setFile(target.files[0]);
            }
        }
    }

    const imagemDePerfilFile = (file) => {

        const reader = new FileReader();
      
        reader.addEventListener("load", function () {
          // converte arquivo de imagem em string base64
          setImagem_de_Perfil(reader.result);
          checkImgPer();
        }, false);
      
        if (file) {
          reader.readAsDataURL(file);
        }
    }

    const onSubmit = (e) => {

        e.preventDefault();
        
        if(confirmarSenha !== senha) {
            toast.error(`Erro: O valor de 'Senha' está diferente de 'Confirmar senha'`);
        }else{

            if(senhaValida !== true){
                toast.error(`Erro: A senha não é válida. Cheque "Validação da Senha"`);
            }else{
                setDisabled(true);

                const data = new FormData();
        
                data.append('nome_de_usuario', nome_de_usuario);
                data.append('email', email);
                data.append('senha', senha);
                data.append('file', file);
        
                axios.post(`${sa.address}/usuarios/registrar`, data)
                .then(res => {
                    Cookies.set('confirmado', true);
                    window.location.href = '/login';
                })  
                .catch(err => {
                    toast.error(`Erro: ${err.response.data.erro}`)
                    setDisabled(false);
                })
            }

        }

    }

    const resetImageValue = () => {
        inputImage.current.value = '';
        setImagem_de_Perfil(pfp_src);
        checkImgPer();
        setNome_PFP(inputImage.current.value.split('C:\\fakepath\\')[1]);
    }

    const checkImgPer = () => {
        if(pfp_src === undefined )
            return;

        if(imagem_de_perfil !== pfp_src){
            setLimpaDisabled(false);
        }else{
            setLimpaDisabled(true);
        }
    }

    const testaSenha = (senha) => {
        if(senhaRegex.test(senha)){
            setSenhaValida(true);
        }else{
            setSenhaValida(false);
        }
    }

    useEffect(()=>{
        setPFP_SRC(pfp.base64);
        setImagem_de_Perfil(pfp_src);
    }, [])

    useEffect(()=>{
        testaSenha(senha);
    }, [senha])

    return (
        <>
            <Form onSubmit={onSubmit} style={{display:'flex', flexDirection:'column'}} action="#" encType="multipart/form-data">
                <Label htmlFor="nome_do_arquivo_pfp">Imagem de Perfil</Label>
                    <Image className="perfil" src={imagem_de_perfil} alt=""/>
                    <SpanButton limpaDisabled={!limpaDisabled} onClick={ limpaDisabled ? resetImageValue : null }>Limpar Imagem</SpanButton>
                    <SpanPFP>
                        <Input 
                            ref={inputImage}
                            disabled={disabled}
                            type="file"
                            id="nome_do_arquivo_pfp"
                            accept=".jpg"
                            onChange={e=>{
                                checkFileSize(e.target);
                                setNome_PFP(e.target.value.split('C:\\fakepath\\')[1]);
                            }}
                        />
                        <p>{nome_PFP === undefined ? constNome_PFP : nome_PFP}</p>
                    </SpanPFP>
                    <small>tipos: .jpg - máx.: 4 MB</small>
                <Label htmlFor="nome_de_usuario">Nome de Usuário(a) <span>*</span> </Label>
                    <Input 
                        disabled={disabled}
                        required
                        type="text"
                        id="nome_de_usuario"
                        value={nome_de_usuario}
                        onChange={e=>{
                                setNome_De_Usuario(e.target.value)
                                e.target.setCustomValidity('')
                            }
                        }
                        onInvalid={e=>e.target.setCustomValidity('Por favor, preencha o campo com seu nome de usuário(a)')}
                    />
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
                <SenhaTooltip 
                    data-tip={senhaTooltip}
                >
                    Validação da Senha <span>?</span> 
                </SenhaTooltip>
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
                <Label htmlFor="confirmarSenha">Confirmar senha <span>*</span> </Label>
                    <Input 
                        disabled={disabled}
                        required
                        type="password"
                        id="confirmarSenha"
                        value={confirmarSenha}
                        onChange={e=>{
                                setConfirmarSenha(e.target.value)
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
                    <Button type="submit">Cadastrar Usuário</Button>
                }
            </Form>
            <ToastContainer/>
            <ReactTooltip />
        </>
    )
}

export default Cadastrar;