import React from 'react';

import ModalBackDropStyles from './modal-back-drop.module.css';
import PropTypes from "prop-types";

const ModalBackDrop = ({onClick}) => {
    return (
        <div className={ ModalBackDropStyles.modalWindow } onClick={ onClick } ></div>
   );
}

export default ModalBackDrop

ModalBackDrop.propTypes = {
    onClick: PropTypes.func.isRequired,
};