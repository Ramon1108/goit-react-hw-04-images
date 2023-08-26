import './ImgGalleryItem.css';
import Modal from '../Modal';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ImgGalleryItem({ item }) {
  const { webformatURL } = item;
  const [shownModal, setShownModal] = useState(false);

  const onModal = () => {
    setShownModal(prevShownModal => !prevShownModal);
  };

  return (
    <li className="ImgGalleryItem">
      <img
        onClick={onModal}
        className="ImgGalleryItem-image"
        src={webformatURL}
        alt="img"
      />
      {shownModal && <Modal onClose={onModal} image={item} />}
    </li>
  );
}

ImgGalleryItem.propTypes = {
  item: PropTypes.object,
};

export default ImgGalleryItem;
