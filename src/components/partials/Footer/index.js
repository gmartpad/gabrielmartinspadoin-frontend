import React from 'react';
import ReactTooltip from 'react-tooltip';

import { FooterArea } from './styled';

const Footer = () => {

    let img_src = "../../../../assets/redes/";

    return (
       <FooterArea>
            <div className="backgroundColor">
                <div className="footerTextContainer">
                    <div className="copyright"><small>&#169; </small><p>Todos os direitos reservados</p></div><span> - </span><a data-tip="contato.gabrielmartinspadoin@gmail.com" href="mailto:contato.gabrielmartinspadoin@gmail.com" className="footerTextContainerName">Gabriel Martins Padoin</a><span> | </span><p>Site construído com a Stack MERN</p>
                </div>
                <div className="footerIconContainer">
                    <a className="footerIcon" href="https://twitter.com/__paddock__">
                        <img alt="twitter" className="footerIconImg" src={`${img_src}twitter.png`}/>
                    </a>
                    <a className="footerIcon" href="https://www.linkedin.com/in/gabriel-martins-padoin-0aba40153/">
                        <img alt="linkedin" className="footerIconImg" src={`${img_src}linkedin.png`}/>
                    </a>
                    <a className="footerIcon" href="https://github.com/gmartpad">
                        <img alt="github" className="footerIconImg" src={`${img_src}github.png`}/>
                    </a>
                    <a className="footerIcon" href="https://dev.to/gmartpad">
                        <img alt="devto" className="footerIconImg" src={`${img_src}devto.png`}/>
                    </a>
                </div>   
            </div> 
            <ReactTooltip />
       </FooterArea>
    );
}

export default Footer;