'use client';

import { useState, useEffect } from 'react';

export default function ApplicationModal({ isOpen, onClose, initialPlan = 'standard' }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        plan: initialPlan,
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    useEffect(() => {
        // Run only on client to avoid hydration mismatch
        if (typeof window !== 'undefined') {
            if (isOpen) {
                setFormData(prev => ({ ...prev, plan: initialPlan }));
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
    }, [isOpen, initialPlan]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const subject = encodeURIComponent(`New Course Application: ${formData.plan} Plan`);
            const body = encodeURIComponent(
                `Full Name: ${formData.fullName}\n` +
                `Email: ${formData.email}\n` +
                `Selected Plan: ${formData.plan}\n\n` +
                `Message:\n${formData.message}`
            );

            const mailtoUrl = `mailto:info@learnfinity.com?subject=${subject}&body=${body}`;

            // We use window.location.href to trigger the mail client
            window.location.href = mailtoUrl;

            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
            }, 3000);
        } catch (err) {
            console.error('Submission error:', err);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: 'var(--spacing-md)',
            animation: 'fadeIn 0.2s ease-out',
        }}>
            <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: 'var(--radius-2xl)',
                padding: 'var(--spacing-2xl)',
                width: '100%',
                maxWidth: '500px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                position: 'relative',
                border: '1px solid rgba(255, 255, 255, 0.2)',
            }}>
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
                        color: 'var(--color-text-tertiary)',
                        transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => e.target.style.color = 'var(--color-text-primary)'}
                    onMouseOut={(e) => e.target.style.color = 'var(--color-text-tertiary)'}
                >
                    &times;
                </button>

                {status === 'success' ? (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-xl) 0' }}>
                        <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>🚀</div>
                        <h2 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-primary)' }}>Application Started!</h2>
                        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                            Your email client should have opened. Please send the email to finalize your application.
                            We'll get back to you shortly!
                        </p>
                    </div>
                ) : (
                    <>
                        <h2 style={{ marginBottom: 'var(--spacing-sm)', fontSize: '1.75rem' }}>Apply for the Program</h2>
                        <p style={{ color: 'var(--color-text-tertiary)', marginBottom: 'var(--spacing-xl)', fontSize: '0.9rem' }}>
                            Fill out the form below to start your journey with English for IT.
                        </p>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: '600', fontSize: '0.9rem' }}>
                                    Full Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    style={{
                                        width: '100%',
                                        padding: 'var(--spacing-md)',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)',
                                        fontSize: '1rem',
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: '600', fontSize: '0.9rem' }}>
                                    Work Email
                                </label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@company.com"
                                    style={{
                                        width: '100%',
                                        padding: 'var(--spacing-md)',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)',
                                        fontSize: '1rem',
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: '600', fontSize: '0.9rem' }}>
                                    Select Plan
                                </label>
                                <select
                                    name="plan"
                                    value={formData.plan}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: 'var(--spacing-md)',
                                        borderRadius: 'var(--radius-md)',
                                        border: '1px solid var(--color-border)',
                                        fontSize: '1rem',
                                        backgroundColor: 'white',
                                    }}
                                >
                                    <option value="free">Free Access</option>
                                    <option value="standard">Standard Course</option>
                                    <option value="premium">Premium Course</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontWeight: '600', fontSize: '0.9rem' }}>
                                    Message (Optional)
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us about your goals or ask any questions..."
                                    style={{
                                        width: '100%',
                                        padding: 'var(--spacing-md)',
                                        borderRadius: 'var(--radius-md)',
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
                                {status === 'submitting' ? 'Processing...' : 'Submit Application'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
