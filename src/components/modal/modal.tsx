import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ModalBackDrop} from '../modal-back-drop/modal-back-drop'
import { IModalProps } from "../../utils/interfaces"

import ModalStyles from './modal.module.css';

export default function Modal(props: IModalProps) {
    const { header, onClose, children } = props;
    const modalRoot: HTMLElement | null =  document.getElementById('react-modals');

    const ECK_KEYCODE = "Escape";

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === ECK_KEYCODE) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [onClose])

    return ReactDOM.createPortal(
        (
            <>
                <ModalBackDrop onClick={ onClose } />
                <div className={ ModalStyles.content }>
                    <div className={ ModalStyles.headerBlock }>
                        <h3 className={`${ModalStyles.header} text text_type_main-large m-2 pr-2 pt-1`}>{ header }</h3>
                        <CloseIcon type="primary" onClick={ onClose } />
                    </div>
                    <div className={`${ ModalStyles.childContent } `}>
                        { children }
                    </div>
                </div>
            </>
        ),
        modalRoot!
    );
}