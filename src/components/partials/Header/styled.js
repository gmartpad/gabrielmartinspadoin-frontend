import styled from 'styled-components';

export const HeaderArea = styled.div`

    height:80px;
    width:100%;
    background:#222;
    color:#fff;
    display:flex;
    justify-content:center;
    align-items:center;
    position: fixed;
    z-index:2002;

    ul {
        display:flex;
        flex-direction:row;
        padding:0;

        li {
            list-style:none;
            text-transform:uppercase;
            perspective: 300px;
            transition: all .2s ease-in-out;
            margin:0 5px;
            padding:5px 10px;
            border-radius:10px;
            transition: all .2s ease-in-out;

            &.noUpper{
                text-transform:none;
            }

            button {
                background: none;
                border: none;
                text-transform: uppercase;
                font-size: 16px;
                padding: 0px;
                cursor: pointer;
            }

            a, button {
                color:#fff;
                font-weight:bold;
                text-decoration:none;
                display:block;
                transition: all .2s ease-in-out;
            }

            &:hover{
                background:#ddd;
                a, button{
                    color:#222;
                }
            }

        }

    }

    a.headPerf {
        display: flex;
        position: absolute;
        right: 20px;

        img {
            height: 40px;
            width: 40px;
            border-radius: 50%;
        }

    }

    @media only screen and (min-width: 1231px){
        a.headPerf {
            right: calc(50% - 595px) !important;
        }
    }

    @media only screen and (min-width: 769px){
        div.mobile{
            display: none;
        }
    }

    @media only screen and (max-width: 768px){
        
        height: 50px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        
        ul.desktop{
            display: none;
        }

        div.mobile {
            width: calc(157.857px + 19.420vw);
            height: 200vh;
            background: #444;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 999;
            transition: all .2s ease-in-out;

            ul {
                display: flex;
                flex-direction: column;

                li{
                    margin: .83vh 15px;
                    padding: 2.5vh 10px;

                    &:hover{
                        background: #444;
                    }

                    &:active{
                        background: #444;
                    }

                    a{
                        color: #fff !important;
                    }

                }

            }

            .burger-button{
                position: absolute;
                right: 0;
                top: 0;
                background: none;
                border: none;
                border-bottom-left-radius: 5px;
                height: 50px;
                width: 50px;
                background-color: #666;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 30px;
                font-weight: 700;
                padding-bottom: 8px;
                color: #ddd;
                z-index: 1000;
                transition: all .2s ease-in-out;

            }

            .burger-button.closed {
                right: -50px !important;
                border-bottom-left-radius: 0px !important;
                border-top-right-radius: 6px;
                border-bottom-right-radius: 6px;
                display: flex;
                flex-direction: column;

                span{
                    width: 25px;
                    height: 4px;
                    background-color: #ddd;
                    margin: 4px 0 2px -2px;
                    border-radius: 2px;
                }

            }

        }

        .mobile.closed {
            left: calc(-157.857px - 19.420vw) !important;
        }

        a.headPerf {
            right: 10px;
        }

    }

`;