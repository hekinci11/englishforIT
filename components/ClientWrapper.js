'use client';

import { ModalProvider, useModal } from '../lib/ModalContext';
import ApplicationModal from './ApplicationModal';

export default function ClientWrapper({ children }) {
    return (
        <ModalProvider>
            {children}
            <ModalWrapper />
        </ModalProvider>
    );
}

function ModalWrapper() {
    const { isModalOpen, closeModal, selectedPlan } = useModal();
    return (
        <ApplicationModal
            isOpen={isModalOpen}
            onClose={closeModal}
            initialPlan={selectedPlan}
        />
    );
}
