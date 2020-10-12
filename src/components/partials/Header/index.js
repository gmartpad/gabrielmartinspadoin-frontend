import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { isLogged, doLogout, isAdmin } from '../../../helpers/AuthHandler';
import axios from 'axios';

import { HeaderArea } from './styled';

import sa from '../../../config/server.json';

const Header = () => {

    const u = useSelector(state => state.usuario);

    let config = {
        headers: {
            "Authorization": `Bearer ${u.token}`,
        }
    }

    //-----------------------------

    const logout = () => {
        doLogout();
        window.location.href = '/';
    }

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
                // console.log(`pfp_src: ${pfp_src}`)
            })
            .catch(err => console.log(`ERRO: ${err.response.data.erro}`))
        })
        .catch(err => console.log(`ERRO: ${err}`))

    }

    const checkCloseMenu = () => {
        document.querySelector('#root').addEventListener('click', 
            e=>{
                let a = [];
                e.path.forEach(e=>{
                    if(e.classList !== undefined){
                        if(e.classList.contains('burger-button')){
                            a.push('burger-button')
                        }else if(e.classList.contains('mobile')){
                            a.push('mobile')
                        }else if(e.classList.contains('m-link')){
                            a.push('m-link')
                        }
                    }
                })
                if(!a.includes('mobile') && !a.includes('burger-button') || a.includes('m-link')){
                    if(burgerActive){
                        setBurgerActive(!burgerActive);
                    }
                };
            }
        )
    }

    useEffect(()=>{
        if(isLogged()){
            getPFP_SRC();
        }
        checkCloseMenu();
    })

    //-----------------------------

    const [pfp_src, setPFP_SRC] = useState();
    const [imagem_de_perfil, setImagem_de_Perfil] = useState(pfp_src);
    const [burgerActive, setBurgerActive] = useState(false);

    return (
        <HeaderArea>
            <ul className="desktop">
                {
                    isLogged() ?
                        <>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/sobre">Sobre</Link>
                            </li>
                            <li className="noUpper">
                                <Link to="/apis">APIs</Link>
                            </li>
                            {isAdmin() &&
                                <>
                                    <li>
                                        <Link to="/certificados/criar">Certificados</Link>
                                    </li>
                                    <li>
                                        <Link to="/posts/criar">Criar Post</Link>
                                    </li>
                                </>
                            }
                            <li>
                                <Link to="/perfil">Perfil</Link>
                            </li>
                            <li>
                                <button onClick={logout}>Sair</button>
                            </li>
                        </>
                                :
                        <>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/sobre">Sobre</Link>
                            </li>
                            <li className="noUpper">
                                <Link to="/apis">APIs</Link>
                            </li>
                            <li>
                                <Link to="/cadastre-se">Cadastre-se</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </>
                }
                
            </ul>
            <div 
                className={ burgerActive ? "mobile" : "mobile closed"}
            >
                <ul>
                    {
                        isLogged() ?
                            <>
                                <li className="m-link">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="m-link">
                                    <Link to="/sobre">Sobre</Link>
                                </li>
                                <li className="noUpper m-link">
                                    <Link to="/apis">APIs</Link>
                                </li>
                                {isAdmin() &&
                                    <>
                                        <li className="m-link">
                                            <Link to="/certificados/criar">Certificados</Link>
                                        </li>
                                        <li className="m-link">
                                            <Link to="/posts/criar">Criar Post</Link>
                                        </li>
                                    </>
                                }
                                <li className="m-link">
                                    <Link to="/perfil">Perfil</Link>
                                </li>
                                <li className="m-link">
                                    <button onClick={logout}>Sair</button>
                                </li>
                            </>
                                    :
                            <>
                                <li className="m-link">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="m-link">
                                    <Link to="/sobre">Sobre</Link>
                                </li>
                                <li className="noUpper m-link">
                                    <Link to="/apis">APIs</Link>
                                </li>
                                <li className="m-link">
                                    <Link to="/cadastre-se">Cadastre-se</Link>
                                </li>
                                <li className="m-link">
                                    <Link to="/login">Login</Link>
                                </li>
                            </>
                    }
                </ul>
                <button 
                    onClick={() => setBurgerActive(!burgerActive)} 
                    className={ burgerActive ? "burger-button" : "burger-button closed"}
                >
                    {burgerActive ?
                        <>
                            &#120;
                        </>
                                  :
                        <>
                            <span></span>
                            <span></span>
                            <span></span>
                        </>
                    }
                    

                    
                </button>
            </div>
            {isLogged() ?
                <a className="headPerf" href="/perfil">
                    <img alt="imagem_de_perfil" src={imagem_de_perfil}/>
                </a>
                        :
                <></>
            }
            
        </HeaderArea>
    );
}

export default Header;