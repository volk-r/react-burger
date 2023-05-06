import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalBackDrop from '../modal-back-drop/modal-back-drop'

import ModalStyles from './modal.module.css';

export default function Modal(props) {
    const modalRoot =  document.getElementById('react-modals')

    const [state] = useState({
        isModalOpen: props.show,
        header: props.header,
        children: props.children,
        handleCloseModal: props.onClose,
    })

    return ReactDOM.createPortal(
        (
            <>
                <ModalBackDrop show={ state.isModalOpen } onClick={ state.handleCloseModal } />
                {state.isModalOpen
                &&
                    <div className={ ModalStyles.content }>
                        <div className={ ModalStyles.headerBlock }>
                            <h3 className={`${ModalStyles.header} text text_type_main-medium pr-2`}>{ state.header }</h3>
                            <CloseIcon type="primary" onClick={ state.handleCloseModal } />
                        </div>
                        <div className={`${ ModalStyles.childContent } `}>
                            {state.children}
                        </div>
                    </div>
                }
            </>
        ),
        modalRoot
    );
}