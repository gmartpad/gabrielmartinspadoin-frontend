import styled from 'styled-components';

export const PerfilDiv = styled.div`

    .perfilHeader{
        padding: 12px 0; 
        display: flex;
        margin: 10px auto 0 auto;
        width: 100%;
        justify-content: center;
    }

    @media only screen and (max-width: 425px){
        .perfilHeader{
            flex-direction: column;
            align-items: center;
            /* height: 150px; */
        }

        span.perfilHeader > span:nth-child(2) {
            margin-top: 20px !important;
        }
    }

`;