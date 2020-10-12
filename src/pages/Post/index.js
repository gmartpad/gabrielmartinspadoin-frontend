import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { isLogged } from '../../helpers/AuthHandler';

import { APIBody } from './../APIs/styled';
import { TextArea, Button } from '../Login/styled'
import TriangleLoader from '../../components/partials/TriangleLoader';
import { Standard } from '../../components/MainComponents';
import { ComentariosSection, Comentario } from './styled';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import sa from '../../config/server.json';


const Post = () => {

    const u = useSelector(state => state.usuario);

    const [axiosSlug, setAxiosSlug] = useState('');

    const [autor, setAutor] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [titulo, setTitulo] = useState('');
    const [autoresComentarios, setAutoresComentarios] = useState([]);
    const [comentarios, setComentarios] = useState([]);
    // eslint-disable-next-line
    const [seu_id, setSeu_ID] = useState(u._id);
    const [seuComentario, setSeuComentario] = useState('');

    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [disabled, setDisabled] = useState(false);

    const getAxiosSlug = () => {

        let array = window.location.pathname.split('/')
        let slug = array[array.length-1];

        setAxiosSlug(slug);

    }

    const getAutorRealName = async (id) => {
        await axios.get(`${sa.address}/usuarios/idSearch/${id}`)
            .then(res => setAutor(res.data.usuario.nome_de_usuario))
            .catch(err => {
                if(err.response !== undefined){
                    console.log(`Erro: ${err.response.data.erro}`)
                }else{
                    console.log(`Houve um erro inesperado. Tente novamente mais tarde.`)
                }
            });
    }
    
    const setAC = async (comentarios) => {
        let a = [];
        comentarios.forEach(async e=>{
            await axios.get(`${sa.address}/usuarios/${e.autor_comentario_id}`)
                .then(res => {
                    a.push(res.data.usuario.nome_de_usuario);
                })
                .catch(err => console.log(err))
            if(a.length === comentarios.length){
                setAutoresComentarios(a); 
            }
        })
    } 

    const getPost = async () => {

        let array = window.location.pathname.split('/')
        let slug = array[array.length-1];

        await axios.get(`${sa.address}/posts/${slug}`)
            .then(res => {
                let data = res.data[0];
                // setAutor(data.autor);
                getAutorRealName(data.autor_id);
                setConteudo(data.conteudo);
                setCreatedAt(data.createdAt);
                setThumbnail(data.thumbnail);
                setTitulo(data.titulo);
                setComentarios(data.comentarios);
                setAC(data.comentarios);
                setLoading(false);
            })
            .catch(err => console.log(err))
    }

    const addComentario = async () => {

        await axios.post(`${sa.address}/posts/atualizarComentarios/${axiosSlug}`, { _id: seu_id, seuComentario })
            .then(res => {
                toast.success(res.data.mensagem, {autoClose: 3000});
                setComentarios(res.data.post.comentarios);
                setAC(res.data.post.comentarios);
                setSeuComentario('');
            })
            .catch(err => {
                if(err.response !== undefined){
                    toast.error(`Erro: ${err.response.data.erro}`);
                }else{
                    toast.error(`Houve um erro inesperado. Tente novamente mais tarde.`)
                }
            })
    }

    const deletarComentario = async ( _id ) => {

        await axios.post(`${sa.address}/posts/deletarComentario/${axiosSlug}`, {_id})
            .then(res => {
                toast.success(res.data.mensagem, {autoClose: 3000});
                setComentarios(res.data.post.comentarios);
                setAC(res.data.post.comentarios);
            })
            .catch(err => {
                if(err.response !== undefined){
                    toast.error(`Erro: ${err.response.data.erro}`);
                }else{
                    toast.error(`Houve um erro inesperado. Tente novamente mais tarde.`)
                }
            })
    }

    useEffect(() => {
        getPost();
        getAxiosSlug();
    }, [])

    return (
        <>
            {loading ? 
                <APIBody>
                    <TriangleLoader/>
                </APIBody>
                     :
                <Standard className="postPage" >
                    <h1 >{titulo}</h1>
                    <div className="thumbnail">
                        <img src={`${sa.address}/posts/recursos/images/${thumbnail === undefined ? 'pfp_padrao.jpg' : thumbnail}`} alt={`${thumbnail === '' ? 'pfp_padrao.jpg' : thumbnail}`}/>
                    </div>
                    <small>por <strong>{autor}</strong> em {createdAt.slice(0, 10).split('-').reverse().join('/')}</small>
                    <div className="content" dangerouslySetInnerHTML={{__html: conteudo}}></div>
                    <ComentariosSection>
                        <h2>Comentários</h2>
                        {comentarios.map((i, k) => 
                            i === undefined ?
                                    <>
                                    </>
                                        :
                                    <Comentario key={k}>
                                        <h3>{autoresComentarios[k]}</h3>
                                        <p>{i.comentario_conteudo}</p>
                                        <p className="data">{i.comentario_data.slice(0, 10).split('-').reverse().join('/')}</p>
                                        {seu_id === i.autor_comentario_id &&
                                            <Button onClick={() => deletarComentario(i._id)} >&#10006;</Button>
                                        }
                                    </Comentario>
                        )}
                        {isLogged() === true ?
                            <>
                                <p>Escreva seu comentário</p>
                                <TextArea
                                    disabled={disabled}
                                    id="seuComentario"
                                    value={seuComentario}
                                    onChange={e=>{
                                        setSeuComentario(e.target.value);
                                    }}
                                    rows="6"
                                    cols="50"
                                >
                                </TextArea>
                                <Button 
                                    onClick={addComentario}
                                    style={{margin: '0 0 10px auto'}} 
                                >
                                    Adicionar Comentário
                                </Button>
                            </>
                                    :
                            <>
                                <p>Para que você possa comentar nas postagens, você precisa estar logado. Faça o <a href="/login">Login</a>. Ainda não possui conta? <a href="/cadastre-se">Crie sua conta!</a></p>
                            </>
                        }
                    </ComentariosSection>
                    <ToastContainer/>
                </Standard>
            }
        </>
    )
}

export default Post;