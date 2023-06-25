import React from 'react';

import ErrorBoundaryStyles from './error-boundary.module.css'
import { ErrorBoundaryProps, ErrorBoundaryState } from '../../utils/interfaces'

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    // с помощью этого метода меняем стейт компонента при возникновении ошибки:
    static getDerivedStateFromError() {
        return { hasError: true };
    }

    // с помощью этого метода логируем информацию об ошибке:
    componentDidCatch(error: any, info: any) {
        console.log("Возникла ошибка!", error, info);
    }

    render() {
        if (this.state.hasError) {
            // если возникла ошибка, сообщаем об этом пользователю в специальном компоненте:
            return (
                <section className={ ErrorBoundaryStyles.errorBlock }>
                    <h1>Что-то пошло не так :(</h1>
                    <p>
                        В приложении произошла ошибка. Пожалуйста, перезагрузите страницу.
                    </p>
                </section>
            );
        }
        // если всё работает штатно, рендерим дочерние компоненты
        return this.props.children;
    }
}