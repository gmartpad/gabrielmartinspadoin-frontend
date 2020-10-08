import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Certificados, Certificado, TextoSobre, TituloSobre } from './styled';
import { APIBody } from './../APIs/styled';
import TriangleLoader from '../../components/partials/TriangleLoader';
import Modal from '../../components/partials/Modal';
import { Standard } from '../../components/MainComponents';
import axios from 'axios';
import sa from '../../config/server.json';

const Sobre = () => {

    //-----------------------------------------------

    const getCertificados = async () => {
        await axios.get(`${sa.address}/certificados/`)
            .then(res => {
                let cArray = [];
                res.data.forEach(e=>{
                    cArray.push({
                        id: e._id,
                        src: `${sa.address}/certificados/recursos/images/${e.imagem_do_certificado}`,
                        titulo: e.nome_do_certificado,
                        descricao: e.nome_do_certificado,
                    })
                })
                setCertificadosArray(cArray);
                setModalSrc(cArray[0].src);
                setCertificadosLoading(false);
            })
            .catch(err => console.log(err));
    }


    //-----------------------------------------------

    const [certificadosArray, setCertificadosArray] = useState([]);
    const [certificadosLoading, setCertificadosLoading] = useState(true);
    const [modalSrc, setModalSrc] = useState();

    const dispatch = useDispatch();
    
    const setOpen = (newOpen) => dispatch({
        type: 'SET_CERT_OPEN',
        payload: {
            open: newOpen
        }
    });

    const setModal = (src, open) => {
        setModalSrc(src);
        setOpen(open);
    }

    useEffect(()=>{
        getCertificados();
    }, [])

    //-----------------------------------------------

    return (
        <>
            {certificadosLoading ?
                <APIBody>
                    <TriangleLoader/>
                </APIBody>
                                 :
                <Standard className="standardSobre">
                    <TituloSobre>Sobre Mim</TituloSobre>
                    <TextoSobre>
                        Olá, meu nome é Gabriel Martins Padoin. Vim ao mundo num hospital o qual eu não me lembro o nome agora,
                        localizado em Criciúma, Santa Catarina na data de 18 de Novembro do ano 2000. Durante meus - quase - primeiros 18 anos de vida frequentei a escola,
                        joguei video-game, estudei uma quantia considerável, fui muitas vezes ao mercado e perdi algumas partidas de UNO™. 
                        <br/><br/>
                        Em julho de 2018, através do curso básico de Python, oferecido gratuitamente pelo Curso em Vídeo do Gustavo Guanabara, eu descobri que gostava de programação. 6 meses depois, saí do então curso 
                        o qual estava matriculado na faculdade (Engenharia Química) para ingressar no curso de Engenharia da Computação da mesma (Faculdade SATC). Passei por Python, PHP, Java, C#, C++, entre outras linguagens nesse meio tempo.
                        Mas dentre todas as linguagens a qual interagi, JavaScript foi a que mais interessou devido a simplicidade para o aprendizado, porém também oferecendo um longo percurso
                        para os que decidirem se especializar e se tornarem mestres, assim como a flexibilidade e popularidade da mesma (grande quantidade de material de estudo e suporte da comunidade).  
                        <br/><br/>
                        Atualmente, pretendo me estabilizar na Stack MERN (MongoDB, Express.js, React.js, Node.js), me tornando um Desenvolvedor Full Stack consistente nessas tecnologias,
                        porém pretendo continuar o estudo da linguagem base, avançando ainda mais meu conhecimento nas tecnologias de implementação tais como Docker, Firebase, GraphQL e a AWS,
                        também explorando tecnologias como React Native, TypeScript, VueJS, Angular2+.
                        <br/><br/>
                        Resumindo, quero entender quais são os pontos fortes e fracos dos frameworks e bibliotecas baseadas em JavaScript e dos supersets do JavaScript, tal como é o TypeScript. 
                    </TextoSobre>

                    <TituloSobre>Sobre o Site</TituloSobre>
                    <TextoSobre>
                        Este site que você está atualmente navegando foi construído com a Stack MERN (MongoDB, Express, React.js, Node.js).
                        <br/><br/>
                        <ul>
                            <li>MongoDB é um banco de dados NoSQL, ou seja, é um banco que não utiliza das estruturas tabulares semelhantes à aquelas usadas
                            em bancos relacionais, logo, é um banco não-relacional.</li>                 
                            <br/><br/>
                            <li>Express.js é um framework do Node.js que tem como alguns de seus objetivos
                            facilitar a construção de APIs, agilizar a estruturação de arquiteturas MVC no server-side, gerenciar rotas, requisições e views, entre outros.</li>
                            <br/><br/>
                            <li>React.js é uma biblioteca open-source em JavaScript utilizada para criar interfaces de usuário e componentes de UI, podendo ser utilizada
                            para criação de SPAs (Single Page Applications, ou Aplicações de Página Única) ou aplicações móveis (se bem que React Native é uma ferramenta.
                            melhor para este último caso).</li>
                            <br/><br/>
                            <li>Node.js é um ambiente que permite a execução de código JavaScript fora do ambiente dos browsers, permitindo
                            scripting do lado do servidor.</li>
                        </ul>
                    </TextoSobre>


                    <TituloSobre>Certificados</TituloSobre>
                    <Certificados>
                        {certificadosArray.map((i, k)=>
                            <Certificado onClick={e=>setModal(i.src, true)} key={k} index={k} src={i.src} title={i.titulo} alt={i.descricao}/>
                        )}
                    </Certificados>
            
                    <Modal src={modalSrc} />
                </Standard>
            }
            
        </>
    )
}

export default Sobre;