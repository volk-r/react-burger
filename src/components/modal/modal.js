import React from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalBackDrop from '../modal-back-drop/modal-back-drop'

import ModalStyles from './modal.module.css';
import PropTypes from "prop-types";

export default function Modal({
    show,
    header,
    onClose,
    children,
}) {
    const modalRoot =  document.getElementById('react-modals')

    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 27) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [onClose])

    if (show === false) {
        return null;
    }

    return ReactDOM.createPortal(
        (
            <>
                <ModalBackDrop onClick={ onClose } />
                <div className={ ModalStyles.content }>
                    <div className={ ModalStyles.headerBlock }>
                        <h3 className={`${ModalStyles.header} text text_type_main-medium pr-2`}>{ header }</h3>
                        <CloseIcon type="primary" onClick={ onClose } />
                    </div>
                    <div className={`${ ModalStyles.childContent } `}>
                        { children }
                    </div>
                </div>
            </>
        ),
        modalRoot
    );
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    header: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};