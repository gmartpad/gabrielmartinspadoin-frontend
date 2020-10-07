import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ModalWindow, ModalBackground } from './styled';

const Modal = (props) => {

    //----------------------------------------------

    const dispatch = useDispatch();

    const open = useSelector(state => state.certificados.open);

    const setOpen = (newOpen) => dispatch({
        type: 'SET_CERT_OPEN',
        payload: {
            open: newOpen
        }
    });

    //----------------------------------------------

    return (
        <ModalBackground className="mb" onClick={e=>e.target.classList.contains('mb') ? setOpen(false) : '' } open={open}>
            <ModalWindow open={open}>
                <button onClick={() => setOpen(false)}>X</button>
                <img src={props.src} alt="" />
            </ModalWindow>
        </ModalBackground>
    );

}

export default Modal;