import styled from 'styled-components';

export const PokeDiv = styled.div`

    display: flex;
    justify-content:left;
    align-items:center;
    position: relative;

    .pokéSprite {
        width: 20%;
        margin: -15px auto 50px auto;
        /* border:1px solid blue; */
        display:flex;
        justify-content:center;
        align-items:center;

        .pokéImg {
            height:100%;
            /* border: 1px solid #0f0; */
        }

    }

    .pokéInfo {
        width: 100%;
        position:absolute;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        bottom:15px;
        left:0;
        /* border:1px solid red; */
    }

    @media only screen and (max-width: 425px) {
        flex-direction: column;
    }

`;