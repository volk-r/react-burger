import React from 'react';

import ModalBackDropStyles from './modal-back-drop.module.css';

const ModalBackDrop = ({onClick}) => {
    return (
        <div className={ ModalBackDropStyles.modalWindow } onClick={ onClick } ></div>
   );
}

export default ModalBackDrop