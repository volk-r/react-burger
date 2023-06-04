import React from 'react';
import NotFoundImage from "../../images/404.png";
import style from "./not-found.module.css";

export default function NotFound404() {
    return (
        <img src={ NotFoundImage } alt="Page not found" className={ style.img } />
    );
}