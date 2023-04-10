import { Modal } from "components/Modal/Modal";
import { useState } from "react";
import PropTypes from 'prop-types';
import { ImageGallerItemWrapper } from "./ImageGalleryItemWrapper.styled";

export const ImageGalleryItem = ({imageUrl, tags, largeImageURL}) => {

    const [modalActive, setModalActive] = useState(false)

    const toggleModal = () => {
        setModalActive(!modalActive);
    };



    return (
        <ImageGallerItemWrapper className="ImageGalleryItem" onClick={toggleModal}>
            <img className="ImageGalleryItem-image" src={imageUrl} alt={tags} />
            {modalActive && <Modal largeImageURL={largeImageURL} toggleModal={toggleModal} />}
        </ImageGallerItemWrapper>
    );
};

ImageGalleryItem.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
}