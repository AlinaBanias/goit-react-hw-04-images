import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { ModalWrapper } from "./ModalWrapper.styled";



const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImageURL, toggleModal }) => {

    useEffect(() => {
        console.log('mounted');
        
        window.addEventListener('keydown', closeModalByEsc)
        return () => window.removeEventListener('keydown', closeModalByEsc)  

    })

    const closeModalByEsc = e => {
        console.log(e.code);
        if (e.code === 'Escape') {
            toggleModal()
        };
    };

    const handleClickBackdrop = e => {
        if(e.currentTarget !== e.target) {
        toggleModal();
        }
    }

    return createPortal(
        <ModalWrapper>
            <div className="Modal" onClick={handleClickBackdrop}>
                <img src={largeImageURL} alt="" />
            </div>
        </ModalWrapper>,
        modalRoot
    );
};


Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
}