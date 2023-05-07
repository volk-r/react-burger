import React from 'react';

import ModalBackDropStyles from './modal-back-drop.module.css';

const ModalBackDrop = ({onClick}) => {
    const handleClick = () => {
        console.log("[ModalBackDrop]: close modal");
        onClick();
    }

    return (
        <div className={ ModalBackDropStyles.modalWindow } onClick={ handleClick } ></div>
   );
}

export default ModalBackDrop