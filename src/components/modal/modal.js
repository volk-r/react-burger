import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalBackDrop from '../modal-back-drop/modal-back-drop'

import ModalStyles from './modal.module.css';

export default function Modal({
    show,
    header,
    onClose,
    children,
}) {
    const modalRoot =  document.getElementById('react-modals')

    const handleClose = () => {
        console.log("[Modal]: close modal");
        onClose();
    };

    const onKeydown = ({ key }) => {
        switch (key) {
            case 'Escape':
                console.log("[Modal]: close modal");
                onClose()
                break
            default:
                break;
        }
    }

    React.useEffect(() => {
        document.addEventListener('keydown', onKeydown)
        return () => document.removeEventListener('keydown', onKeydown)
    })

    return ReactDOM.createPortal(
        (
            <>
                <ModalBackDrop show={ show } onClick={ handleClose } />
                {show
                &&
                    <div className={ ModalStyles.content }>
                        <div className={ ModalStyles.headerBlock }>
                            <h3 className={`${ModalStyles.header} text text_type_main-medium pr-2`}>{ header }</h3>
                            <CloseIcon type="primary" onClick={ handleClose } />
                        </div>
                        <div className={`${ ModalStyles.childContent } `}>
                            {children}
                        </div>
                    </div>
                }
            </>
        ),
        modalRoot
    );
}