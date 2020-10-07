import styled from 'styled-components';

export const Textdiv = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 74%;
    margin: 0 5%;
    background: #aaa;
    border-radius: 10px;
    padding: 20px 30px;
    color: #000;
    border: 3px solid #000;
    box-shadow: 2px 2px 4px #666;

    h3{
        margin-top:0;
        text-align:center;
    }

    p{
        text-align:center;
    }

    button {
        background:none;
        border:none;
        background-color:#000;
        color:#fff;
        padding:10px;
        border-radius:10px;
        cursor:pointer;
        transition:all .2s ease-in-out;
        outline:none;
        border:2px solid #000;

        &:hover{
            background-color:#fff;
            color:#000;
            font-weight:bold;
        }

    }

    @media only screen and (max-width: 425px) {
        h3{
            font-size: 18px;
        }
    }

    @media only screen and (max-width: 320px) {
        h3{
            font-size: 16px;
        }
    }

`;

export const SimpleCircle = styled.div`

    &.form{
        margin: 0 auto;
    }
    
    /*
    The loaders use CSS custom properties (variables) to control the attributes of the loaders
    */
    :root{
        --loader-width: 36px;
        --loader-height: 36px;
        --loader-color-primary: #222;
        --loader-color-secondary: #eee;
        --line-width: 3px;
        --animation-duration: 2s;
        --loader-initial-scale: 0.1;
    }
    .loader,.loader:before,.loader:after{
        box-sizing: border-box;
        flex-grow: 0;
        flex-shrink: 0;
    }
    /*
    In order to get optimal results, please only change the 
    variables above and don't change anything in the actual loader code
    */
        
        

    @keyframes circle-loader {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .loader.simple-circle {
        transform-origin: center center;
        border: var(--line-width, 4px) solid var(--loader-color-secondary, #fff);
        border-right-color: var(--loader-color-primary, #222);
        width: var(--loader-width, 36px);
        height: var(--loader-height, 36px);
        border-radius: 50%;
        animation: circle-loader var(--animation-duration, 1s) infinite ease-out;
    }

`;