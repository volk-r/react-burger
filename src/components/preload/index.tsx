import React, { FC } from 'react';
import Styles from "./preload.module.css";
import WaitImage from "../../images/wait.gif";

export const Preload: FC = () => {
    return (
        <img src={ WaitImage } alt="Loading.." className={ Styles.loading } />
    );
}