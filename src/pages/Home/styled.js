import styled from 'styled-components';

export const PostAnchor = styled.a`

    background: #222;
    border-radius: 5px;
    padding: 15px;
    width: 40%; 
    max-height: 230px;
    margin: 2%; 
    display: flex; 
    text-decoration: none;
    transition: all .2s ease-in-out;

    &:hover{
        transform: translateY(-15px);
    }

    @media only screen and (max-width: 768px){
        width: 100%;
    }

`;

export const PostImg = styled.img`

    max-width: 200px;
    max-height: 200px;
    min-width: 100px;
    min-height: 100px;
    margin: auto 0;
    width: calc(-98.544px + 24.272vw); 
    height: calc(-98.544px + 24.272vw); 
    object-fit: cover;
    object-position: center;

    @media only screen and (max-width: 768px){
        width: calc(32.828px + 8.746vw);
        height: calc(32.828px + 8.746vw);
        min-width: 70px;
        min-height: 70px;
    }

`;

export const PostInfo = styled.div`

    color: #ddd;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .title {
        margin: calc(-45.288px + 5.204vw) 0;
        font-size: 18px;
        font-weight: 700;
    }

    p {
        margin: calc(-43.709px + 4.854vw) 5px calc(-43.709px + 4.854vw) 0;
    }

    @media only screen and (min-width: 1230px){
        h3 {
            margin: 18.72px 0;
        }
        p {
            margin: 16px 0;
        }
    }

    @media only screen and (max-width: 1024px){
        h3 {
            margin: 8px 0;
        }
        p {
            margin: 6px 5px 6px 0;
        }
    }

    @media only screen and (max-width: 425px){
        h3 {
            font-size: 18px;
        }
        p {
            font-size: 14px;
        }
    }

`;

export const PageTitle = styled.h1`

    text-align: center;
    margin-top: 30px;

`;