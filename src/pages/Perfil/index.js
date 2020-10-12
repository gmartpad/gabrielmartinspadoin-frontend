import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import ReactTooltip from 'react-tooltip';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Form, Input, Button, Label, Image, SpanPFP } from '../Login/styled';
import { SpanButton } from '../Cadastrar/styled';
import { SimpleCircle } from '../../components/partials/Textlike/styled';
import { PerfilDiv } from './styled';
import { SenhaTooltip } from '../Cadastrar/styled';

import { APIBody } from './../APIs/styled';
import TriangleLoader from '../../components/partials/TriangleLoader';

import sa from '../../config/server.json';

const Perfil = () => {

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

    const u = useSelector(state => state.usuario);

    let config = {
        headers: {
            "Authorization": `Bearer ${u.token}`,
        }
    }

    let senhaTooltip = 'A senha deve conter, no mínimo, 8 caracteres e dentre esses deve possuir: Um caractere maiúsculo, um minúsculo, um especial (ex.: !@#$%^&*) e um número.';

    const [pfp_src, setPFP_SRC] = useState();
    const [secaoResto, setSecaoResto] = useState(true);
    const [loading, setLoading] = useState(true);

    const [nome_de_usuario, setNome_De_Usuario] = useState('');
    const [imagem_de_perfil, setImagem_de_Perfil] = useState(pfp_src);
    const [file, setFile] = useState();

    const [constNome_PFP, setConstNome_PFP] = useState('');
    const [nome_PFP, setNome_PFP] = useState(undefined);

    const [oldEmail, setOldEmail] = useState('');
    const [email, setEmail] = useState('');

    const [senhaAtual, setSenhaAtual] = useState('')
    const [confirmarSenhaAtual, setConfirmarSenhaAtual] = useState('');
    const [senhaAtualCriptografada, setSenhaAtualCriptografada] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
    // eslint-disable-next-line
    const [senhaRegex, setSenhaRegex] = useState(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"))
    const [senhaAtualValida, setSenhaAtualValida] = useState(false);
    const [novaSenhaValida, setNovaSenhaValida] = useState(false);


    const [disabled, setDisabled] = useState(false);
    const [limpaDisabled, setLimpaDisabled] = useState(false);

    const inputImage = useRef(null);

    const checkFileSize = (target) => {
        if(target.files[0] !== undefined){
            if(target.files[0].size > 4194304){
                toast.error('Erro: Tamanho do arquivo excedeu o limite. Tente um mais leve');
                if(!target.value === undefined){
                    //nada
                }else{
                    target.value = ""
                    setImagem_de_Perfil(pfp_src)
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

    const onSubmitInfo = async (e) => {

        e.preventDefault();

        if(!await bcrypt.compare(senhaAtual, senhaAtualCriptografada)){
            toast.error(`Erro: O valor de 'Senha' está incorreta`);
        }else if(confirmarSenhaAtual !== senhaAtual) {
            toast.error(`Erro: O valor de 'Senha' está diferente de 'Confirmar senha'`);
        }else{

            if(senhaAtualValida !== true){
                toast.error(`Erro: A senha não é válida. Cheque "Validação da Senha"`);
            }else{

                setDisabled(true);

                const data = new FormData();

                data.append('nome_de_usuario', nome_de_usuario);
                data.append('oldEmail', oldEmail);
                data.append('email', email);
                data.append('senhaAtual', senhaAtual);
                data.append('file', file);

                await axios.post(`${sa.address}/usuarios/atualiza_info`, data, config)
                    .then(res => {
                        toast.success(`${res.data.mensagem}`)
                        let u = res.data.usuario;
                        let token = res.data.token;
                        setUsuario(u._id, u.nome_de_usuario, u.imagem_de_perfil, u.email, token)
                        u = undefined;
                        token = undefined;
                        res = null;
                        setDisabled(false);
                    })  
                    .catch(err => {
                        if(err.response !== undefined){
                            console.log(`Erro: ${err.response.data.erro}`)
                        }else{
                            console.log(`Houve um erro inesperado. Tente novamente mais tarde.`)
                        }
                        setDisabled(false);
                    })

            }

        }

    }

    const onSubmitSenha = async (e) => {

        e.preventDefault();
        
        if(!await bcrypt.compare(senhaAtual, senhaAtualCriptografada)){
            toast.error(`Erro: O valor de 'Senha atual' está incorreta`);
        }else if(confirmarNovaSenha !== novaSenha) {
            toast.error(`Erro: O valor de 'Confirmar nova senha' está diferente de 'Nova senha'`);
        }else{

            if(novaSenhaValida !== true){
                toast.error(`Erro: A nova senha não é válida. Cheque "Validação da Senha"`);
            }else{
                    
                setDisabled(true);

                await axios.post(`${sa.address}/usuarios/atualiza_senha`, { email, novaSenha }, config )
                .then(res => {
                    toast.success(`${res.data}`)
                })  
                .catch(err => {
                    if(err.response !== undefined){
                        toast.error(`Erro: ${err.response.data.erro}`)
                    }else{
                        toast.error(`Houve um erro inesperado. Tente novamente mais tarde.`)
                    }
                })

                setSenhaAtual('');
                setNovaSenha('');
                setConfirmarNovaSenha('');
                getUser_Info();

                setDisabled(false);

            }

        }

    }

    //-----------------------------------------

    const _imageEncode = (arrayBuffer) => {
        const b64 = Buffer.from(arrayBuffer).toString('base64');
        let mimetype="image/jpeg"
        return "data:"+mimetype+";base64,"+b64
    }

    const getPFP_SRC = async () => {

        await axios.post(`${sa.address}/usuarios/pfp_info`, {
            email:u.email
        }, config)
        .then(async res => {

            let config2 = {
                headers: {
                    "Authorization": `Bearer ${u.token}`,
                },
                responseType: 'arraybuffer' 
            }
            
            await axios.get(`${sa.address}${res.data.pfp_path}`, config2)
            .then(res => {
                setPFP_SRC(_imageEncode(res.data))
                setImagem_de_Perfil(_imageEncode(res.data))
                checkImgPer();
            })
            .catch(err => {
                if(err.response !== undefined){
                    console.log(`Erro: ${err.response.data.erro}`)
                }else{
                    console.log(`Houve um erro inesperado. Tente novamente mais tarde.`)
                }
            })
        })
        .catch(err => {
            if(err.response !== undefined){
                console.log(`Erro: ${err.response.data.erro}`)
            }else{
                console.log(`Houve um erro inesperado. Tente novamente mais tarde.`)
            }
        })

    }

    const getUser_Info = async (isSecao = false) => {
        let config = {
            headers: {
                "Authorization": `Bearer ${u.token}`,
            }
        }

        await axios.post(`${sa.address}/usuarios/info`, {
            email:u.email
        }, config)
        .then(res => {
            let u = res.data.usuario;
            setOldEmail(u.email);
            setEmail(u.email);
            if(isSecao){
                setImagem_de_Perfil(pfp_src);
            }else{
                setImagem_de_Perfil(u.imagem_de_perfil);
            }
            setNome_De_Usuario(u.nome_de_usuario);
            setSenhaAtualCriptografada(u.senha);
            setSenhaAtual('');
            setConfirmarSenhaAtual('');
            if(u.imagem_de_perfil !== 'pfp_padrao.jpg'){
                setConstNome_PFP(`${u.imagem_de_perfil.slice(0, -10)}.jpg`)
            }
            setTimeout(()=>{
                setLoading(false);
            }, 500)

        })
        .catch(err => {
            if(err.response !== undefined){
                console.log(`Erro: ${err.response.data.erro}`)
            }else{
                console.log(`Houve um erro inesperado. Tente novamente mais tarde.`)
            }
        })

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

    const testaNovaSenha = (senha) => {
        if(senhaRegex.test(senha)){
            setNovaSenhaValida(true);
        }else{
            setNovaSenhaValida(false);
        }
    }

    const testaSenhaAtual = (senha) => {
        if(senhaRegex.test(senha)){
            setSenhaAtualValida(true);
        }else{
            setSenhaAtualValida(false);
        }
    }

    // Hook
    function useWindowSize() {
        // Inicializa o estado com width/height undefined para que o render do servidor e cliente combinem
        const [windowSize, setWindowSize] = useState({
            width: undefined,
            height: undefined,
        });
    
        useEffect(() => {
        // Handler para fazer uma call no window resize
        function handleResize() {
            // Settar a width/height da janela pra o state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        
        // Adiciona um event listener
        window.addEventListener("resize", handleResize);
        
        // Chama o handler logo para que o state seja atualizado com o tamanho inicial da janela
        handleResize();
        
        }, []); // Array vazio nos assegura que o efeito só roda na montagem do DOM
         
        return windowSize;
    }

    let size = useWindowSize();

    useEffect(()=>{
        getUser_Info(true);
    }, [secaoResto])

    useEffect(()=> {
        getPFP_SRC();
    }, [pfp_src])

    useEffect(()=>{
        testaSenhaAtual(senhaAtual);
    }, [senhaAtual])

    useEffect(()=>{
        testaNovaSenha(novaSenha);
    }, [novaSenha])

    return (
        <>
            {loading ? 
                <APIBody>
                    <TriangleLoader/>
                </APIBody>
                    :
                
                <PerfilDiv>
                    <span className="perfilHeader" >
                        <SpanButton active={secaoResto} style={{margin: "0 15px"}} onClick={() => setSecaoResto(true)} >Editar Informações</SpanButton>
                        <SpanButton active={!secaoResto} style={{margin: "0 15px"}} onClick={() => setSecaoResto(false)}>Editar Senha</SpanButton>
                    </span>

                        {/* <Divisoria/> */}

                        {secaoResto ?
                        
                            <Form onSubmit={onSubmitInfo} style={{display:'flex', flexDirection:'column'}} action="#" encType="multipart/form-data">
                                <Label htmlFor="nome_do_arquivo_pfp">Imagem de Perfil</Label>
                                    <span className={size.width > 768 ? 'photoSpan' : 'photoSpan active'} >
                                        <Image className="perfil" src={imagem_de_perfil} alt=""/>
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
                                    </span>
                                    <SpanButton limpaDisabled={!limpaDisabled} onClick={ limpaDisabled ? resetImageValue : null } >Limpar Imagem</SpanButton>
                                    <SpanPFP>
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
                                <h3 style={{marginBottom: '0px'}}>Insira sua senha para autenticar a atualização de suas informações</h3>
                                <SenhaTooltip 
                                    data-tip={senhaTooltip}
                                >
                                    Validação da Senha <span>?</span> 
                                </SenhaTooltip>
                                <Label htmlFor="senhaAtual">Senha <span>*</span> </Label>
                                <Input 
                                    disabled={disabled}
                                    required
                                    type="password"
                                    id="senhaAtual"
                                    value={senhaAtual}
                                    onChange={e=>{
                                            setSenhaAtual(e.target.value)
                                            e.target.setCustomValidity('')
                                        }
                                    }
                                    onInvalid={e=>e.target.setCustomValidity('Por favor, preencha o campo com sua senha')}                    
                                />
                                <Label htmlFor="confirmarSenhaAtual">Confirmar senha <span>*</span> </Label>
                                <Input 
                                    disabled={disabled}
                                    required
                                    type="password"
                                    id="confirmarSenhaAtual"
                                    value={confirmarSenhaAtual}
                                    onChange={e=>{
                                            setConfirmarSenhaAtual(e.target.value)
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
                                    <Button type="submit">Atualizar Informações</Button>
                                }
                                <ReactTooltip />
                            </Form>

                                    :
                            
                            <Form onSubmit={onSubmitSenha} style={{display:'flex', flexDirection:'column'}} action="#">
                                <SenhaTooltip 
                                    data-tip={senhaTooltip}
                                >
                                    Validação da Senha <span>?</span> 
                                </SenhaTooltip>
                                <Label htmlFor="senhaAtual">Senha atual <span>*</span> </Label>
                                    <Input 
                                        disabled={disabled}
                                        required
                                        type="password"
                                        id="senhaAtual"
                                        value={senhaAtual}
                                        onChange={e=>{
                                                setSenhaAtual(e.target.value)
                                                e.target.setCustomValidity('')
                                            }
                                        }
                                        onInvalid={e=>e.target.setCustomValidity('Por favor, preencha o campo com sua senha atual')}                    
                                    />
                                <Label htmlFor="novaSenha">Nova senha <span>*</span> </Label>
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
                                        onInvalid={e=>e.target.setCustomValidity('Por favor, preencha o campo com sua nova senha')}                    
                                    />
                                <Label htmlFor="confirmarNovaSenha">Confirmar nova senha <span>*</span> </Label>
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
                                        onInvalid={e=>e.target.setCustomValidity('Por favor, preencha o campo com sua nova senha')}                    
                                    />
                                {disabled ?
                                    <SimpleCircle className="form">
                                        <div className="loader simple-circle"></div>
                                    </SimpleCircle>
                                        :
                                    <Button type="submit">Atualizar Senha</Button>
                                }
                                <ReactTooltip />
                            </Form>

                        }

                    
                    <ToastContainer/>
                </PerfilDiv>
            } 
        </>
    )
}

export default Perfil;