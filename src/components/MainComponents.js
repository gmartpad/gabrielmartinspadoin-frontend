import styled from 'styled-components';

export const Template = styled.div`

    display:flex;
    flex-direction:column;
    width: 100%;
    justify-content: space-between;
    /* margin-top: 50px; */

    @media only screen and (max-width: 768px){
        padding-top: 50px;
        margin-top: 0px;
    }

`;

export const Standard = styled.div`

    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    /* width: 100%; */
    max-width: 1230px;
    margin: 0 auto;
    padding: 0 15px;
    text-align: justify;

    .apenasPosts {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        margin-bottom: 20px;
    }

    &.standardSobre {
        padding: 40px 30px 70px 30px;
    }

    &.postPage{

        width: calc(100vw - 30px);

        h1{
            font-size: 50px; 
            text-align: center; 
            width: calc(100% - 30px); 
            max-width: 1230px; 
            padding: 0 15px;
        }  

        .thumbnail {
            width: 100%;
            display: flex;
            justify-content: center;

            img{
                width: 100%; 
                max-width: 1200px;
                height: calc(-9.549px + 33.297vw);
                object-fit: cover;
                object-position: center;
                margin: 0 auto;
                border-radius: 15px;
            }

        } 

        small{
            margin: 15px 0 0 0;
            width: 100%;
        }   

        div.content{
            margin: 30px 0 0 0;
            text-align: justify;

            p {
                text-align: justify;
                /* word-break: break-all; */
            }

        }

        @media only screen and (max-width: 768px){
            h1{
                font-size: 36px;
            }
        }

        @media only screen and (max-width: 425px){
            img{
                width: 100%;
                margin: 0 auto;
            }
            h1{
                font-size: 30px;
            }
        }

    }

`;

export const PaddingCont = styled.div`

    padding-top: 80px;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;

    @media only screen and (max-width: 768px){
        padding-top: 0px;
    }

`;