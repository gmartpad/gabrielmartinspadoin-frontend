import styled from 'styled-components';

export const ComentariosSection = styled.div`

    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
    width: 100%;

`;

export const Comentario = styled.div`

    background: #ddd;
    padding: 15px;
    border-radius: 6px;
    border: 2px solid #222;
    position: relative;
    margin-bottom: 15px;

    h3 {
        margin-top: 0px;
    }

    button {
        width: 45px !important;
        position: absolute;
        right: 15px;
        top: 15px;
    }

    p.data{
        font-size: 12px;
        margin-bottom: 0px;
        width: fit-content;
        margin-left: auto;
    }

`; 