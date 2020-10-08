import React, { useState, useRef, useMemo, useEffect } from 'react';
// eslint-disable-next-line
import { latinize } from '../../helpers/Latinize';
import { useSelector } from 'react-redux';
import JoditEditor from 'jodit-react';
import Cookies from 'js-cookie';
import axios from 'axios';

import { Form, Input, Button, Label, Image, SpanPFP } from '../Login/styled'
import { SpanButton } from '../Cadastrar/styled';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import pfp from '../../config/pfp.json';
import sa from '../../config/server.json';

const CriarPost = (props) => {

    const getConfig = (props) => {
        const config = {
          readonly: false,
          placeholder: "Escreve teu post aqui"
        }
        return config;
    }

    const editor = useRef(null)
    const newConfig = useMemo(() => getConfig(props), [props]); 

    const [disabled, setDisabled] = useState(false);
    const [limpaDisabled, setLimpaDisabled] = useState(false);

    const [imagem_de_perfil, setImagem_de_Perfil] = useState('');
    const [pfp_src, setPFP_SRC] = useState(pfp.base64);
    const inputImage = useRef(null);
    const [nome_PFP, setNome_PFP] = useState(undefined);
    // eslint-disable-next-line
    const [constNome_PFP, setConstNome_PFP] = useState('');
    const [file, setFile] = useState();

    //--------------------------------------------------------------

    const u = useSelector(state => state.usuario);

    const getID = async () => {
        await axios.get(`${sa.address}/usuarios/nduSearch/${u.nome_de_usuario}`)
            .then(res => setAutor_Id(res.data[0]._id))
            .catch(err => console.log(err.response.data.erro))
    }

    //--------------------------------------------------------------

    const formatString = (string) => {
        if(string.latinize().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, '-').toLowerCase().slice(-1) === '-'){
            return string.latinize().replace(/[^A-Za-z0-9]/g, ' ').replace(/\s+/g, '-').toLowerCase().slice(0, -1)
        }else{
            return string.latinize().replace(/[^A-Za-z0-9]/g, ' ').replace(/\s+/g, '-').toLowerCase()
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

    const onSubmit = async (e) => {

        e.preventDefault()

        setDisabled(true);

        const data = new FormData();

        data.append('titulo', titulo);
        data.append('slug', slug);
        data.append('autor', autor);
        data.append('autor_id', autor_id);
        data.append('conteudo', conteudo);
        data.append('file', file);

        await axios.post(`${sa.address}/posts/registrar`, data)
        .then(res => {
            Cookies.set('postEnviado', true);
            window.location.href = '/';
        })  
        .catch(err => {
            if(err.response !== undefined){
                toast.error(`Erro: ${err.response.data.erro}`)
            }else{
                toast.error(`Houve um erro inesperado. Tente novamente mais tarde.`)
            }
            setDisabled(false);
        })
    }

    useEffect(()=>{
       getID();
       setPFP_SRC(pfp.base64);
       setImagem_de_Perfil(pfp_src);
    }, [])
        
    const [titulo, setTitulo] = useState('');
    const [slug, setSlug] = useState('');
    // eslint-disable-next-line
    const [autor, setAutor] = useState(u.nome_de_usuario);
    const [autor_id, setAutor_Id] = useState('');
    const [conteudo, setConteudo] = useState('')

    

    return (
        <>  
            <Form className="post" onSubmit={onSubmit} action="#" encType="multipart/form-data">
                <Label htmlFor="titulo">Título do Post <span>*</span> </Label>
                <Input
                    disabled={disabled}
                    required
                    type="text" 
                    id="titulo"
                    onChange={e=>{
                        setTitulo(e.target.value);
                        setSlug(formatString(e.target.value));
                        e.target.setCustomValidity('');
                    }}
                    onInvalid={e=>e.target.setCustomValidity('Por favor, preencha o campo com o título do post')}
                />
                <Label htmlFor="thumbnail">Thumbnail</Label>
                    <Image className="post" src={imagem_de_perfil} alt=""/>
                    <SpanButton limpaDisabled={!limpaDisabled} onClick={ limpaDisabled ? resetImageValue : null }>Limpar Imagem</SpanButton>
                    <SpanPFP>
                        <Input 
                            ref={inputImage}
                            disabled={disabled}
                            type="file"
                            id="thumbnail"
                            accept=".jpg"
                            onChange={e=>{
                                checkFileSize(e.target);
                                setNome_PFP(e.target.value.split('C:\\fakepath\\')[1]);
                            }}
                        />
                        <p>{nome_PFP === undefined ? constNome_PFP : nome_PFP}</p>
                    </SpanPFP>
                    <small>tipos: .jpg - máx.: 4 MB</small>
                <Label style={{marginBottom: '10px'}} htmlFor="titulo">Conteúdo <span>*</span> </Label>
                    <JoditEditor
                        ref={editor}
                        value={conteudo}
                        config={newConfig}
                        // tabIndex={1} // tabIndex of textarea // preferred to use only this option to update the content for performance reasons
                        onChange={newContent => {
                            setConteudo(newContent)
                        }}
                        placeholder="JOOJ"
                    />
                <Button type="submit" style={{marginTop: "20px"}}>Enviar Post</Button>
            </Form>
            <ToastContainer/>
        </>
    );

}


export default CriarPost;