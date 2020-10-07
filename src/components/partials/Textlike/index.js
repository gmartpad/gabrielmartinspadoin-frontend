import React from 'react';
import { Textdiv, SimpleCircle } from './styled';

const Textlike = (props) => {

    //----------------------------------

    //----------------------------------

    return (
        <Textdiv>
            <h3>{props.title}</h3>
            <p><strong>{props.contentTitle}</strong>: {props.content}</p>
            {props.loading ?
                <SimpleCircle>
                    <div className="loader simple-circle"></div>
                </SimpleCircle>
                          :
                <button onClick={props.buttonFunction} >{props.buttonTitle}</button>
            }
        </Textdiv>
    );
}

export default Textlike;