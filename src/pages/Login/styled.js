import styled from 'styled-components';

export const Form = styled.form`

    display: flex;
    flex-direction: column;
    margin: auto;
    padding: 30px 10%;
    width: 80%;
    max-width: 1230px;

    small {
        margin-top: -10px;
        margin-bottom: 15px;
    }

    .infoMeta {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .esqueciDiv{
            margin-bottom: 9px;
        }

    }

    .photoSpan{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .photoSpan.active input[type=file]::before{
        background-image: url('../../../assets/input_mask/camera_icon_tiny.png') !important;
        background-color: rgba(0,0,0,0.4) !important;
    }

    &.login{
        max-width: 500px;
    }

    &.post{
        max-width: 600px;
        width: 80%;

        img.post {
            max-width: 600px !important;
            width: 100% !important;
        }

    }

    @media only screen and (max-width: 425px){
        span.infoMeta {
            font-size: 12px;
            margin-bottom: 20px;

            .lembrarSenhaSpan {
                display: flex;
                align-items: center;

                input#lembrarDaSenha{
                    margin: 0;
                }

            }
            
            .esqueciDiv{
                margin: 0;
            }

        }
    }

`;

export const Input = styled.input`

    margin: 8px 0px 15px 0px;
    padding: 5px;
    outline:none;
    border: 2px solid #222;
    border-radius: 5px;
    font-size: 16px;

    &[type=checkbox] {
        cursor: ${props=> props.disabled ? "default" : "pointer"};
    }

    &#nome_do_arquivo_pfp[type=file], &#thumbnail[type=file]{
        border:none;
        border-radius: 50%;
        display: block;
        /* height: 28px; */
        height: 302px;
        width: 306px;
        margin-top: 14px;
        /* padding: 14px 5px 5px 0; */
        padding: 0px !important;
        font-size: 0px;
        /* width: 235px; */
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    @media only screen and (max-width: 425px){
        &#nome_do_arquivo_pfp[type=file], &#thumbnail[type=file]{
            height: calc(67.238px + 55.238vw);
            width: calc(55.048px + 59.048vw);
        }
    }

    .post &#nome_do_arquivo_pfp[type=file], .post &#thumbnail[type=file]{
        border:none;
        display: block;
        height: 28px;
        padding: 14px 5px 5px 0;
        font-size: 0px;
        width: 186px;
    }

    &[type=file]::-webkit-file-upload-button {
        visibility: hidden;
    }

    &[type=file]::before {
        /* background-image: url('../../../assets/input_mask/camera_icon_tiny.png'); */
        background-image: none;
        background-color: rgba(0,0,0,0);
        background-size: 40px 40px;
        background-repeat: no-repeat;
        background-position: center;
        border:2px solid rgba(0,0,0,0);
        border-radius: 50%;
        color: #fff;
        padding:0px;
        border-radius:10px;
        cursor:pointer;
        font-size: 16px;
        transition:all .2s ease-in-out;
        outline:none;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        text-align: center;
        font-weight: normal;
        font-size: 16px !important;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &[type=file]:hover::before{
        background-image: url('../../../assets/input_mask/camera_icon_tiny.png');
        background-color: rgba(0,0,0,0.4);
    }

    &#nome_do_arquivo_pfp[type=file]::before, &#thumbnail[type=file]::before {
        content: '';
    }

    .post &#nome_do_arquivo_pfp[type=file]::before, .post &#thumbnail[type=file]::before {
        content: '';
    }

    &[type=file]:hover::before{
        /* background-color:#fff;
        color:#000;
        font-weight:bold;
        border:2px solid #000; */
    }

`;

export const TextArea = styled.textarea`

    margin: 8px 0px 15px 0px;
    padding: 15px;
    outline:none;
    border: 2px solid #222;
    border-radius: 5px;
    font-size: 16px;
    /* width: 100%; */

    &[type=checkbox] {
        cursor: ${props=> props.disabled ? "default" : "pointer"};
    }

    &#nome_do_arquivo_pfp[type=file], &#thumbnail[type=file]{
        border:none;
        display: block;
        height: 28px;
        padding: 14px 5px 5px 0;
        font-size: 0px;
        width: 235px;
    }

    &[type=file]::-webkit-file-upload-button {
        visibility: hidden;
    }

    &[type=file]::before {
        background:none;
        border:2px solid #000;
        background-color: #000;
        color: #fff;
        padding:10px;
        border-radius:10px;
        cursor:pointer;
        font-size: 16px;
        transition:all .2s ease-in-out;
        outline:none;
        width: 200px;
        margin: 0 auto;
        text-align: center;
        font-weight: normal;
        font-size: 16px !important;

    }

    &#nome_do_arquivo_pfp[type=file]::before, &#thumbnail[type=file]::before {
        content: 'Escolha sua imagem de perfil';
    }

    &[type=file]:hover::before{
        background-color:#fff;
        color:#000;
        font-weight:bold;
        border:2px solid #000;
    }

`;

export const Button = styled.button`

    background:none;
    border:2px solid #000;
    background-color:#000;
    color:#fff;
    padding:10px;
    border-radius:10px;
    cursor:pointer;
    font-size: 16px;
    transition:all .2s ease-in-out;
    outline:none;
    width: 200px;
    margin: 0 auto;

    &:hover{
        background-color:#fff;
        color:#000;
        font-weight:bold;
    }

`;

export const Label = styled.label`

    font-weight: bold;

    span{
        color: #d00;
    }

    &.checkbox {
        padding:3px 3px 3px 10px;
        cursor: ${props=> props.disabled ? "default" : "pointer"};
    }

`;

export const Image = styled.img`

    max-width: 300px;
    max-height: 300px;
    width: 300px;
    height: 300px;
    object-fit: cover;
    margin: 10px auto;
    border: 2px solid #222;
    border-radius: 8px;

    &.certificados {
        max-width:648px;
        max-height:405px;
        width:calc(9.172px + 78.384vw);
        height:calc(5.732px + 48.990vw);
        background: rgba(0,0,0,0.3)
    }

    &.perfil{
        border-radius: 50%;
    }

    &.post{
        width: 700px;
        max-width: 700px;
    }

    @media only screen and (max-width: 425px){
        width: calc(57.143px + 57.143vw);
        height: calc(57.143px + 57.143vw);
    }

`;

export const SpanPFP = styled.span`

    display: flex;

    p{
        margin: 20px 0 !important;
    }

    @media only screen and (max-width: 425px){
        flex-direction: column;

        [type=file]{
            width: 100% !important;
            padding: 25px 0px !important;
            display: flex !important;
            justify-content: center !important; 
        }

        [type=file]::before {
            width: 98% !important;
            padding: 10px 0 !important;
        }

        p {
            margin: 0px auto 30px auto;
            text-align: center;
        }

    }

`;