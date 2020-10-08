import React, { useState } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import { Form, Input, Button, Label, Image } from '../Login/styled'

import sa from '../../config/server.json';

const Certificados = () => {

    const [nome_do_certificado, setNome_Do_Certificado] = useState();
    const [imagem_do_certificado, setImagem_Do_Certificado] = useState();
    const [file, setFile] = useState();

    const [disabled, setDisabled] = useState(false);

    const imagemDeCertificadoFile = (file) => {

        if(file === undefined){
            setImagem_Do_Certificado(undefined)
        }else{
            const reader = new FileReader();
        
            reader.addEventListener("load", function () {
            // converte arquivo de imagem em string base64
                setImagem_Do_Certificado(reader.result);
            }, false);
        
            if (file) {
                reader.readAsDataURL(file);
            }
        }            

    }

    const checkFileSize = (target) => {
        if(target.files[0] !== undefined){
            if(target.files[0].size > 2097152){
                toast.error('Erro: Tamanho do arquivo excedeu o limite. Tente um mais leve');
                if(!target.value === undefined){
                    //nada
                }else{
                    target.value = ""
                    setTimeout(()=>{
                        setImagem_Do_Certificado()
                    }, 200)
                }
            }else{
                imagemDeCertificadoFile(target.files[0])
                setFile(target.files[0]);
            }
        }
    }

    const onSubmit = (e) => {

        e.preventDefault();

        setDisabled(true);

        const data = new FormData();

        data.append('nome_do_certificado', nome_do_certificado);
        data.append('file', file);

        axios.post(`${sa.address}/certificados/registrar`, data)
        .then(res => {
            toast.success(`${res.data.mensagem}`)
            setDisabled(false);
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

    return (
        <>
            <Form onSubmit={onSubmit} action="#" encType="multipart/form-data">
                <Label htmlFor="imagem_do_certificado">Imagem do Certificado <span>*</span></Label>
                <Image className="certificados" src={imagem_do_certificado} alt=""/>
                <input 
                    required
                    disabled={disabled}
                    type="file" 
                    id="imagem_do_certificado" 
                    accept=".jpg"
                    size={32154} 
                    onChange={
                        e=>{
                            const file = e.target.files[0]
                            const target = e.target
                            imagemDeCertificadoFile(file);
                            setFile(file);
                            checkFileSize(target);
                        }
                    } 
                    style={{marginBottom:"20px"}}
                />
                <small>tipos: .jpg - máx.: 2 MB</small>
                <Label htmlFor="nome_do_certificado">Nome do Certificado <span>*</span></Label>
                <Input
                    required
                    disabled={disabled}
                    type="text"
                    id="nome_do_certificado"
                    onChange={
                        e=>{
                            const value = e.target.value
                            setNome_Do_Certificado(value)
                        }
                    } 
                />
                <Button type="submit">Enviar Certificado</Button>
            </Form>
            <ToastContainer/>
        </>
    )
}

export default Certificados;