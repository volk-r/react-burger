import React, { FC } from 'react';

import ModalBackDropStyles from './modal-back-drop.module.css';
import { TModalBackDrop } from "../../utils/types";

export const ModalBackDrop: FC<TModalBackDrop> = ({onClick}) => {
    return (
        <div className={ ModalBackDropStyles.modalWindow } onClick={ onClick } ></div>
   );
}