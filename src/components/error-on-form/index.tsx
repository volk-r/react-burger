import React, { FC } from "react";
import styles from "./error-on-form.module.css";
import { IErrorOnForm } from "../../utils/interfaces";

export const ErrorOnForm: FC<IErrorOnForm> = ({ children }) => {
    return (
        <section className={`${ styles.errorBlock } mb-3`}>
            <p className="text text_type_main-default">{children}</p>
        </section>
    );
}