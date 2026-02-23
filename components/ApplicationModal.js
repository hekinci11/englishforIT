'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../lib/LanguageContext';
import { translations } from '../lib/translations';

export default function ApplicationModal({ isOpen, onClose, initialPlan = 'standard' }) {
    const { language } = useLanguage();
    const t = translations[language].modal;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        plan: initialPlan,
        languagePreference: language === 'tr' ? 'Turkish' : 'English',
        message: ''
    });

    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    useEffect(() => {
        // Run only on client to avoid hydration mismatch
        if (typeof window !== 'undefined') {
            if (isOpen) {
                setFormData(prev => ({
                    ...prev,
                    plan: initialPlan,
                    languagePreference: language === 'tr' ? 'Turkish' : 'English'
                }));
                setStatus('idle');
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'unset';
            }
        }
        return () => {
            if (typeof window !== 'undefined') {
                document.body.style.overflow = 'unset';
            }
        };
    }, [isOpen, initialPlan, language]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // Construct the mailto URL
            const subject = encodeURIComponent(`New Course Application: ${formData.plan} Plan`);
            const body = encodeURIComponent(
                `Full Name: ${formData.name}\n` +
                `Email: ${formData.email}\n` +
                `Selected Plan: ${formData.plan}\n` +
                `Language Preference: ${formData.languagePreference}\n\n` +
                `Message:\n${formData.message}`
            );

            const mailtoUrl = `mailto:info@learnfinityacademy.com?subject=${subject}&body=${body}`;

            // We use window.location.href to trigger the mail client
            window.location.href = mailtoUrl;

            // Set to success after a small delay to allow the mail client to start
            setTimeout(() => {
                setStatus('success');
            }, 1000);

        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--spacing-md)',
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
        }} onClick={onClose}>
            <div style={{
                background: 'white',
                borderRadius: 'var(--border-radius-2xl)',
                width: '100%',
                maxWidth: '600px',
                padding: 'var(--spacing-2xl)',
                position: 'relative',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                animation: 'modalSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }} onClick={e => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 'var(--spacing-lg)',
                        right: 'var(--spacing-lg)',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: 'var(--color-text-muted)',
                        padding: 'var(--spacing-xs)',
                    }}
                >
                    &times;
                </button>

                {status === 'success' ? (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-xl) 0' }}>
                        <div style={{
                            fontSize: '4rem',
                            marginBottom: 'var(--spacing-lg)',
                        }}>✉️</div>
                        <h2 style={{ marginBottom: 'var(--spacing-md)' }}>{t.successTitle}</h2>
                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                            {t.successBody}
                        </p>
                        <button
                            className="btn btn-primary"
                            style={{ marginTop: 'var(--spacing-xl)', width: '100%' }}
                            onClick={onClose}
                        >
                            {language === 'tr' ? 'Kapat' : 'Close'}
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 style={{ fontSize: '1.875rem', marginBottom: 'var(--spacing-xs)' }}>{t.title}</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xl)' }}>
                            {t.subtitle}
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: '600', fontSize: '0.875rem' }}>{t.fullName}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--color-border)' }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: '600', fontSize: '0.875rem' }}>{t.email}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="john@company.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--color-border)' }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: '600', fontSize: '0.875rem' }}>{t.plan}</label>
                                    <select
                                        name="plan"
                                        value={formData.plan}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--color-border)', background: 'white' }}
                                    >
                                        <option value="free">{language === 'tr' ? 'Ücretsiz - Sadece Modüller' : 'Free - Modules Only'}</option>
                                        <option value="standard">{language === 'tr' ? 'Standart - Canlı Dersler' : 'Standard - Live Classes'}</option>
                                        <option value="premium">{language === 'tr' ? 'Premium - Özel Koçluk' : 'Premium - Private Coaching'}</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: '600', fontSize: '0.875rem' }}>{t.languagePref}</label>
                                    <select
                                        name="languagePreference"
                                        value={formData.languagePreference}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--color-border)', background: 'white' }}
                                    >
                                        <option value="English">{language === 'tr' ? 'İngilizce' : 'English'}</option>
                                        <option value="Turkish">{language === 'tr' ? 'Türkçe' : 'Turkish'}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: '600', fontSize: '0.875rem' }}>{t.message}</label>
                                <textarea
                                    name="message"
                                    rows="3"
                                    placeholder="Tell us about your technical background..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: 'var(--spacing-md)',
                                        borderRadius: 'var(--border-radius-lg)',
                                        border: '1px solid var(--color-border)',
                                        fontSize: '1rem',
                                        minHeight: '100px',
                                        resize: 'vertical',
                                    }}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={status === 'submitting'}
                                style={{ width: '100%', padding: 'var(--spacing-lg)', fontSize: '1.1rem', marginTop: 'var(--spacing-md)' }}
                            >
                                {status === 'submitting' ? t.processing : t.submit}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
