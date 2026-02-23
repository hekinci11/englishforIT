'use client';

import Link from 'next/link';
import { useState } from 'react';
import ApplicationModal from './ApplicationModal';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <nav style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(148, 163, 184, 0.2)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--spacing-lg)',
            }}>
                <Link href="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-sm)',
                    textDecoration: 'none',
                }}>
                    <img
                        src="/logo.png"
                        alt="English for IT"
                        style={{
                            height: '84px',
                            width: 'auto',
                        }}
                    />
                </Link>

                {/* Desktop Menu */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-xl)',
                }} className="desktop-menu">
                    <Link href="/dashboard" style={{
                        color: 'var(--color-text-secondary)',
                        fontWeight: '500',
                        transition: 'color var(--transition-fast)',
                    }}>
                        Dashboard
                    </Link>
                    <Link href="/modules/vocabulary" style={{
                        color: 'var(--color-text-secondary)',
                        fontWeight: '500',
                        transition: 'color var(--transition-fast)',
                    }}>
                        Modules
                    </Link>
                    <Link href="/ai-practice" style={{
                        color: 'var(--color-text-secondary)',
                        fontWeight: '500',
                        transition: 'color var(--transition-fast)',
                    }}>
                        AI Practice
                    </Link>
                    <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>
                        Get Started
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="mobile-menu-toggle"
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text-primary)',
                        fontSize: 'var(--font-size-xl)',
                        cursor: 'pointer',
                    }}
                >
                    ☰
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="mobile-menu" style={{
                    display: 'none',
                    flexDirection: 'column',
                    gap: 'var(--spacing-md)',
                    padding: 'var(--spacing-lg)',
                    background: 'var(--color-bg-secondary)',
                    borderTop: '1px solid var(--color-border)',
                }}>
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/modules/vocabulary">Modules</Link>
                    <Link href="/ai-practice">AI Practice</Link>
                    <button className="btn btn-primary btn-sm" onClick={() => setIsModalOpen(true)}>Get Started</button>
                </div>
            )}

            <style jsx>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: block !important;
          }
          .mobile-menu {
            display: flex !important;
          }
        }
      `}</style>
            <ApplicationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialPlan="standard"
            />
        </nav>
    );
}
