import React from "react";
import styles from "./error-on-form.module.css";

export const ErrorOnForm = ({ children }) => {
    return (
        <section className={`${ styles.errorBlock } mb-3`}>
            <p className="text text_type_main-default">{children}</p>
        </section>
    );
}