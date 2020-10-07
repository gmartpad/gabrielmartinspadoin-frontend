import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Cookies from 'js-cookie';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { PostAnchor, PostImg, PostInfo, PageTitle } from './styled';
import { Button } from '../Login/styled'
import { SimpleCircle } from '../../components/partials/Textlike/styled';
import { APIBody } from './../APIs/styled';
import TriangleLoader from '../../components/partials/TriangleLoader';
import { Standard } from '../../components/MainComponents';

import sa from '../../config/server.json';

const Home = () => {

    const cpe = () => {
        let pE = Cookies.get('postEnviado');
        if(pE){
            Cookies.remove('postEnviado');
            pE = undefined;
            toast.success("Post cadastrado com sucesso!");
        }
    }
    // eslint-disable-next-line
    const cpa = () => {
        let pA = Cookies.get('postAtualizado');
        if(pA){
            Cookies.remove('postAtualizado');
            pA = undefined;
            toast.success("Post atualizado com sucesso!");
        }
    }

    const getPosts = async (pc) => {

        await axios.get(`${sa.address}/posts/`)
            .then(async res => {
                let p = posts;
                let a = autores

                for(let i=pc; i<pc+4;i++){
                    if(res.data[i] === undefined){
                        setCarregaAparece(false);
                    }else{
                        p.push(res.data[i])
                        await axios.get(`${sa.address}/usuarios/idSearch/${res.data[i].autor_id}`)
                            .then(res => {
                                a.push(res.data.usuario.nome_de_usuario)
                            })
                            .catch(err => {
                                console.log(`Erro: ${err.response.data.erro}`)
                            });
                    }
                }
                setPosts(p);
                setAutores(a);
                setPConstant(pConstant+4);
                setLoading(false)
                setDisabled(false)
            })
            .catch(err => {
                console.log(err)
            });

    }

    const carregaMais = () => {
        setDisabled(true)
        getPosts(pConstant);
    }

    useEffect(()=>{
        cpe();
        getPosts(pConstant);
    }, [])

    const [posts, setPosts] = useState([]);
    const [autores, setAutores] = useState([]);
    const [pConstant, setPConstant] = useState(0);
    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [carregaAparece, setCarregaAparece] = useState(true)

    return (
        <>
            <PageTitle>
                Blog
            </PageTitle>

            {loading ?
                <APIBody>
                    <TriangleLoader/>
                </APIBody>
                     :
                <Standard style={{flexDirection: 'row', justifyContent: 'center'}} >
                    <div className="apenasPosts">
                        {posts.map((i, k) => 
                            i === undefined ?
                                    <>
                                    </>
                                        :
                                <PostAnchor href={`/post/${i.slug}`} key={k}>
                                    <PostImg 
                                        src={`${sa.address}/posts/recursos/images/${i.thumbnail === undefined ? 'pfp_padrao.jpg' : i.thumbnail}`} 
                                        alt={i.thumbnail}
                                    />
                                    <PostInfo>
                                        <h3>{i.titulo}</h3>
                                        <p>por: {autores[k]}</p>
                                        <p>{i.createdAt.slice(0, 10).split('-').reverse().join('/')}</p>
                                        {/* <p>{i.slug}</p> */}
                                    </PostInfo>
                                </PostAnchor>
                        )} 
                    </div>
                    {!disabled ?    
                            carregaAparece && 
                            <Button style={{margin: '0px auto 25px auto'}} onClick={carregaMais} >Carregar mais posts</Button>
                               :
                            <SimpleCircle className="form" style={{marginBottom: '25px'}}>
                                <div className="loader simple-circle"></div>
                            </SimpleCircle>
                    }
                    
                    
                </Standard>
            }
            
            

            <ToastContainer/>
        </>
    )
}

export default Home;