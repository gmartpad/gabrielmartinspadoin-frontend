import styled from 'styled-components';

export const ModalBackground = styled.div`

    width: 100vw;
    height: 100% ;
    background: rgba(0,0,0,0.5);
    position:fixed;
    top:0;
    left:0;
    transition: all .3s ease-in-out;
    display: ${props => props.open ? 'flex' : 'none'};
    z-index:2000;

`;

export const ModalWindow = styled.div`

    position: absolute;
    top: calc(50% - 210px);
    left: calc(50% - 315px);
    width: 630px;
    height: 360px;
    background: #ddd;
    border: 2px solid #000;
    border-radius: 6px;
    display:${props => props.open ? 'flex' : 'none'};
    justify-content:center;
    align-items:center;
    padding:5vh 0vw;
    z-index:2001;

    button {
        position:absolute;
        background:none;
        border:2px solid #000;
        border-radius: 30px;
        color: #ddd;
        background-color:#222;
        width:60px;
        height:60px;
        display:flex;
        justify-content:center;
        align-items:center;
        outline:none;
        cursor:pointer;
        top:-30px;
        right:-30px;
        font-family: 'Fira Code', monospace !important;
        font-weight: bold;
        font-size: 20px;
        transition: all .2s ease-in-out;

        &:hover {
            background-color: #ddd;
            color: #222;
        }

    }

    img {
        display:block;
        width:100%;
        height:100%;
        object-fit: contain;
    }


    @media only screen and (max-width: 768px){
        width: calc(47.143px + 75.893vw);
        height: calc(17.143px + 44.643vw);
        left: calc(50% - 23.570px - 37.8vw);
        top: calc(50% - 38.621px - 22.321vw);

        button {
            width: calc(8.571px + 6.696vw);
            height: calc(8.571px + 6.696vw);
            top: calc(4.286px - 4.464vw);
            right: calc(4.286px - 4.464vw);
            border-radius: calc(-11.143px + 5.357vw);
        }

    }

`;