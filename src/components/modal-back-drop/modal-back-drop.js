import React from 'react';

import ModalBackDropStyles from './modal-back-drop.module.css';

export default function ModalBackDrop (props) {
    return (
        props.show
        && <div className={ ModalBackDropStyles.modalWindow } onClick={ props.handleCloseModal } ></div> // TODO: onClick not working
   );
}