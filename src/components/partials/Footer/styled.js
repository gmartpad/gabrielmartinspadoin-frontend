import styled from 'styled-components';

export const FooterArea = styled.div`

    /* height:80px; */
    width: calc(100% - 30px);
    background:#222;
    color:#fff;
    text-align: center;
    padding: 0 15px;

    .footerTextContainer {

        margin-top: 20px;
        color: #ddd;
        position: relative;
        display: inline-flex;
        align-items: center;

        .footerTextContainerName {
            position: relative;
            /* display: block; */
            width:fit-content;
            transition: all .2s ease-in-out;
            color: #ddd;
            text-decoration: none;
            font-weight: 500;

            &:after{
                content: ' ';
                width: 100%;
                height: 2px;
                border-radius: 1px;
                background-color: #ddd;
                position: absolute;
                left: 0;
                bottom: 0px;
                transition: all .5s ease-in-out;

            }

        }

        p, a {
            margin: 0 5px;
        }

        .copyright {
            display: flex;
        }

        @media only screen and (max-width: 768px){

            flex-direction: column;

            span {
                display: none;
            }

            p, a{
                margin: 5px 0 !important;
                font-size: 14px;
            }

            small{
                margin: 5px 5px 5px 0 !important;
                font-size: 14px;
            }

            .footerTextContainerName {
                text-decoration: underline;
            }
        }

    }

    .footerIconContainer {

        padding: 20px 0;

        .footerIcon{

            margin: 0 15px;
            display: inline-block;
            width: fit-content;
            transition: all .2s ease-in-out;

            .footerIconImg{

                max-width: 25px;
                max-height: 25px;
                transition: all .3s ease-in-out;
                filter: invert(1);

            }

        }

        .footerIcon:hover .footerIconImg{
            filter: invert(0);
        }

        @media only screen and (max-width: 768px){
            filter: invert(0);
        }

    }

`;