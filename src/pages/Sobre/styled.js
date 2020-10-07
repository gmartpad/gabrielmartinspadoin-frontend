import styled from 'styled-components';

export const Certificados = styled.div`

    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    justify-content: center;
    align-items:center;
    margin: 0 auto;
    width:100%;
    max-width:1230px;
    /* padding: 0 calc((100vw - 1230px)/2); */
    transform: perspective(1500px);

    @media only screen and (max-width: 768px){
        max-width: max-content;
        width: fit-content;
        height: fit-content;
        overflow-x: scroll;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: nowrap;

        /* width */
        ::-webkit-scrollbar {
            width: 10px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            background: #ddd;
            border-radius: 6px;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: #555;
            transition: all .2s ease-in-out;
            border-radius: 6px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: #222;
        }

    }

`;

export const Certificado = styled.img`

    width:30%;
    margin: 0 -12%;
    transform: rotateY(-30deg) rotateX(30deg);
    transition: all .3s ease-in-out;
    z-index: ${props => 10 - props.index};
    /* border: 1px solid #000; */
    cursor:pointer;
    &:hover{
        transform: rotateY(0deg) rotateX(0deg);
        z-index: 10;
    }

    @media only screen and (max-width: 768px){
        transform: none !important;
        margin: 1.5%;
    }

    @media only screen and (max-width: 580px){
        width: 45%;
        margin: 2.5%;
    }

    @media only screen and (max-width: 320px){
        width: 100%;
    }

`;

export const TextoSobre = styled.span`

    font-size: 18px;
    line-height: 1.5;

    li {
        padding-right: 30px;
    }

    @media only screen and (max-width: 425px){
        font-size: 16px;
        line-height: 1.3;
    }

`;

export const TituloSobre = styled.h3`

    font-size: 22px;

`;