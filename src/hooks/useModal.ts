import { useState, useCallback } from "react";
import { IModal } from "../utils/interfaces";

export const useModal = (): IModal => {
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);

    const openModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return {
        isModalOpen,
        openModal,
        closeModal,
    };
};