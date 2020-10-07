import styled from 'styled-components';

export const SpanButton = styled.span`

    background:none;
    border:2px solid;
    border-color: ${props => {
        if(props.limpaDisabled){
            return "#555 !important";
        }else {
            return "000";
        }
    }};
    background-color: ${props => {

        if(props.limpaDisabled){
            return "#555 !important";
        }else if(props.active){
            return "#fff";
        }else if(!props.active){
            return "#000";
        }
    }};
    color: ${props => {

        if(props.limpaDisabled){
            return "#999 !important";
        }else if(props.active){
            return "#000";
        }else if(!props.active){
            return "#fff";
        }

    }};
    padding:10px;
    border-radius:10px;
    cursor: ${props => {
        if(props.limpaDisabled){
            return "default !important";
        }else {
            return "pointer";
        }
    }};
    font-size: 16px;
    transition:all .2s ease-in-out;
    outline:none;
    width: 200px;
    margin: 0 auto;
    text-align: center;
    font-weight: ${props => {

        if(props.limpaDisabled){
            return "normal !important";
        }else if(props.active){
            return "bold";
        }else if(!props.active){
            return "normal";
        }

    }};

    &:hover{
        background-color:#fff;
        color:#000;
        font-weight:bold;
    }

`;

export const SenhaTooltip = styled.h3`

    width: fit-content;
    display: flex;

    span {
        background: #3f51b5;
        color: #fff;
        width: 14px;
        height: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        font-weight: 500;
        border-radius: 50%;
        padding: 1px 1px 0 0;
        margin-left: 5px;
    }

`;