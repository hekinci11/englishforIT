'use client';

import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useModal } from '../lib/ModalContext';
import { useLanguage } from '../lib/LanguageContext';
import { translations } from '../lib/translations';

export default function Home() {
  const [notification, setNotification] = useState(null);
  const { openModal } = useModal();
  const { language } = useLanguage();
  const t = translations[language].hero;

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleEnroll = (e, plan = 'standard') => {
    e.preventDefault();
    openModal(plan);
  };
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #fafbff 0%, #f5f7ff 100%)',
      }}>
        {/* Floating Background Blobs */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0) 70%)',
          borderRadius: '50%',
          animation: 'floatBlob 20s ease-in-out infinite',
          filter: 'blur(60px)',
        }} />

        <div style={{
          position: 'absolute',
          top: '20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(236, 72, 153, 0) 70%)',
          borderRadius: '50%',
          animation: 'floatBlobAlt 25s ease-in-out infinite',
          filter: 'blur(60px)',
        }} />

        <div style={{
          position: 'absolute',
          bottom: '-10%',
          left: '30%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(99, 102, 241, 0) 70%)',
          borderRadius: '50%',
          animation: 'floatBlob 30s ease-in-out infinite',
          filter: 'blur(60px)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <div className="fade-in">
              {/* Badge with Sparkle */}
              <span className="badge badge-primary" style={{
                fontSize: 'var(--font-size-base)',
                padding: 'var(--spacing-md) var(--spacing-xl)',
                marginBottom: 'var(--spacing-2xl)',
                display: 'inline-block',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }}>
                {t.badge}
              </span>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                marginBottom: 'var(--spacing-xl)',
                background: 'var(--gradient-text)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1.1,
                fontWeight: '800',
                letterSpacing: '-0.02em',
              }}>
                {t.title}
              </h1>

              <p style={{
                fontSize: 'var(--font-size-xl)',
                color: 'var(--color-text-primary)',
                marginBottom: 'var(--spacing-lg)',
                maxWidth: '800px',
                margin: '0 auto var(--spacing-lg)',
                fontWeight: '500',
                lineHeight: 1.5,
              }}>
                {t.subtitle}
              </p>

              <p style={{
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-2xl)',
                maxWidth: '700px',
                margin: '0 auto var(--spacing-2xl)',
                lineHeight: 1.6,
              }}>
                {t.description}
              </p>

              <div style={{
                display: 'flex',
                gap: 'var(--spacing-lg)',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
                <button
                  onClick={handleEnroll}
                  className="btn btn-primary btn-lg"
                  style={{ minWidth: '200px' }}
                >
                  {t.ctaStarted}
                </button>
                <Link
                  href="/modules/free"
                  className="btn btn-secondary btn-lg"
                  style={{ minWidth: '200px' }}
                >
                  {t.ctaFree}
                </Link>
              </div>

              {/* Feature indicators with icons */}
              <div style={{
                display: 'flex',
                gap: 'var(--spacing-2xl)',
                justifyContent: 'center',
                flexWrap: 'wrap',
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '500',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                  <span style={{
                    fontSize: '1.2rem',
                    background: 'var(--gradient-purple-pink)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>🎥</span>
                  {t.features.live}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                  <span style={{
                    fontSize: '1.2rem',
                    background: 'var(--gradient-purple-pink)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>🤖</span>
                  {t.features.ai}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                  <span style={{
                    fontSize: '1.2rem',
                    background: 'var(--gradient-purple-pink)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>👨‍🏫</span>
                  {t.features.teachers}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                  <span style={{
                    fontSize: '1.2rem',
                    background: 'var(--gradient-purple-pink)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>🏆</span>
                  {t.features.certificate}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Program Section */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
            {translations[language].about.title}
          </h2>
          <p className="text-center" style={{
            fontSize: 'var(--font-size-lg)',
            color: 'var(--color-text-tertiary)',
            marginBottom: 'var(--spacing-3xl)',
            maxWidth: '800px',
            margin: '0 auto var(--spacing-3xl)',
          }}>
            {translations[language].about.description}
          </p>

          <div className="grid grid-cols-2" style={{ marginBottom: 'var(--spacing-3xl)' }}>
            <div className="card">
              <h3 style={{ marginBottom: 'var(--spacing-md)' }}>{translations[language].about.objectives.title}</h3>
              <ul style={{
                paddingLeft: 'var(--spacing-xl)',
                color: 'var(--color-text-secondary)',
                lineHeight: 2,
              }}>
                {translations[language].about.objectives.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: 'var(--spacing-md)' }}>{translations[language].about.who.title}</h3>
              <ul style={{
                paddingLeft: 'var(--spacing-xl)',
                color: 'var(--color-text-secondary)',
                lineHeight: 2,
              }}>
                {translations[language].about.who.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div style={{
                marginTop: 'var(--spacing-lg)',
                padding: 'var(--spacing-md)',
                background: 'rgba(245, 158, 11, 0.1)',
                borderRadius: 'var(--radius-md)',
                borderLeft: '4px solid var(--color-accent)',
              }}>
                <strong style={{ color: 'var(--color-accent)' }}>{translations[language].about.who.required}</strong>
                <span style={{ color: 'var(--color-text-secondary)', marginLeft: 'var(--spacing-sm)' }}>
                  {translations[language].about.who.proficiency}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Achieve Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: 'var(--spacing-3xl)' }}>
            {translations[language].achievements.title}
          </h2>

          <div className="grid grid-cols-3">
            {translations[language].achievements.items.map((item, index) => {
              const icons = ['🗣️', '💼', '📚', '📝', '🌍', '🎯'];
              return (
                <div key={index} className="card text-center">
                  <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>{icons[index]}</div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: 'var(--spacing-3xl)' }}>
            {translations[language].features.title}
          </h2>

          <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-2xl)' }}>
            {translations[language].features.items.map((item, index) => {
              const icons = ['🎥', '👨‍🏫', '🤖', '📖', '💻', '🏆'];
              return (
                <div key={index} className="card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                    <div style={{ fontSize: '2.5rem' }}>{icons[index]}</div>
                    <h3 style={{ margin: 0 }}>{item.title}</h3>
                  </div>
                  <p>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section">
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
            {translations[language].pricing.title}
          </h2>
          <p className="text-center" style={{
            fontSize: 'var(--font-size-lg)',
            color: 'var(--color-text-tertiary)',
            marginBottom: 'var(--spacing-3xl)',
          }}>
            {translations[language].pricing.subtitle}
          </p>

          <div className="grid grid-cols-3">
            {/* Free Plan */}
            <div className="card">
              <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>{translations[language].pricing.plans.free.title}</h3>
                <div style={{
                  fontSize: 'var(--font-size-4xl)',
                  fontWeight: '700',
                  marginBottom: 'var(--spacing-sm)',
                }}>
                  {translations[language].pricing.plans.free.price}
                </div>
                <p style={{ color: 'var(--color-text-tertiary)', margin: 0 }}>
                  {translations[language].pricing.plans.free.desc}
                </p>
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: 'var(--spacing-xl)',
                color: 'var(--color-text-secondary)',
              }}>
                {translations[language].pricing.plans.free.features.map((f, i) => (
                  <li key={i} style={{ marginBottom: 'var(--spacing-md)' }}>✓ {f}</li>
                ))}
                {translations[language].pricing.plans.free.notIncluded.map((f, i) => (
                  <li key={i} style={{ marginBottom: 'var(--spacing-md)', opacity: 0.5 }}>✗ {f}</li>
                ))}
              </ul>

              <button className="btn btn-secondary" style={{ width: '100%' }} onClick={(e) => handleEnroll(e, 'free')}>
                {translations[language].pricing.plans.free.cta}
              </button>
            </div>

            {/* Standard Plan */}
            <div className="card" style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)',
              borderColor: 'var(--color-primary)',
              borderWidth: '2px',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10,
              }}>
                <span className="badge badge-primary" style={{
                  background: 'var(--gradient-purple-pink)',
                  color: 'white',
                  padding: 'var(--spacing-sm) var(--spacing-lg)',
                  fontWeight: '600',
                }}>{translations[language].pricing.plans.standard.badge}</span>
              </div>

              <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>{translations[language].pricing.plans.standard.title}</h3>
                <div style={{
                  fontSize: 'var(--font-size-4xl)',
                  fontWeight: '700',
                  marginBottom: 'var(--spacing-sm)',
                }}>
                  {translations[language].pricing.plans.standard.price}
                </div>
                <p style={{ color: 'var(--color-text-tertiary)', margin: 0 }}>
                  {translations[language].pricing.plans.standard.desc}
                </p>
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: 'var(--spacing-xl)',
                color: 'var(--color-text-secondary)',
              }}>
                {translations[language].pricing.plans.standard.features.map((f, i) => (
                  <li key={i} style={{ marginBottom: 'var(--spacing-md)' }}>✓ {f}</li>
                ))}
              </ul>

              <button className="btn btn-primary" style={{ width: '100%', cursor: 'pointer' }} onClick={(e) => handleEnroll(e, 'standard')}>
                {translations[language].pricing.plans.standard.cta}
              </button>
            </div>

            {/* Premium Plan */}
            <div className="card">
              <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>{translations[language].pricing.plans.premium.title}</h3>
                <div style={{
                  fontSize: 'var(--font-size-4xl)',
                  fontWeight: '700',
                  marginBottom: 'var(--spacing-sm)',
                }}>
                  {translations[language].pricing.plans.premium.price}
                </div>
                <p style={{ color: 'var(--color-text-tertiary)', margin: 0 }}>
                  {translations[language].pricing.plans.premium.desc}
                </p>
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: 'var(--spacing-xl)',
                color: 'var(--color-text-secondary)',
              }}>
                {translations[language].pricing.plans.premium.features.map((f, i) => (
                  <li key={i} style={{ marginBottom: 'var(--spacing-md)' }}>✓ {f}</li>
                ))}
              </ul>

              <button className="btn btn-primary" style={{ width: '100%', cursor: 'pointer' }} onClick={(e) => handleEnroll(e, 'premium')}>
                {translations[language].pricing.plans.premium.cta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{
        background: 'var(--color-bg-secondary)',
        textAlign: 'center',
      }}>
        <div className="container">
          <h2 style={{ marginBottom: 'var(--spacing-lg)' }}>
            {translations[language].cta.title}
          </h2>
          <p style={{
            fontSize: 'var(--font-size-xl)',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-2xl)',
            maxWidth: '700px',
            margin: '0 auto var(--spacing-2xl)',
          }}>
            {translations[language].cta.subtitle}
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={(e) => handleEnroll(e, 'standard')} className="btn btn-primary btn-lg">
              {translations[language].cta.ctaStarted}
            </button>
            <Link href="/modules/free" className="btn btn-secondary btn-lg">
              {translations[language].cta.ctaFree}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: 'var(--spacing-2xl) 0',
        borderTop: '1px solid var(--color-border)',
        textAlign: 'center',
        color: 'var(--color-text-tertiary)',
      }}>
        <div className="container">
          <p style={{ margin: 0 }}>
            {translations[language].footer.copyright}
          </p>
        </div>
      </footer>

      {/* Modern Notification Toast */}
      {notification && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          padding: '1.5rem 2rem',
          background: 'white',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          borderLeft: '4px solid var(--color-primary)',
          zIndex: 10000,
          animation: 'fadeIn 0.3s ease-out',
          maxWidth: '400px',
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-primary)' }}>{notification.title}</h4>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{notification.message}</p>
          <button
            onClick={() => setNotification(null)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.2rem',
              color: 'var(--color-text-tertiary)'
            }}
          >
            ×
          </button>
        </div>
      )}

    </>
  );
}
