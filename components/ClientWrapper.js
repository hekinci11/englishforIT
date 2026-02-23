'use client';

import { ModalProvider, useModal } from '../lib/ModalContext';
import { LanguageProvider } from '../lib/LanguageContext';
import ApplicationModal from './ApplicationModal';

export default function ClientWrapper({ children }) {
    return (
        <LanguageProvider>
            <ModalProvider>
                {children}
                <ModalWrapper />
            </ModalProvider>
        </LanguageProvider>
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
