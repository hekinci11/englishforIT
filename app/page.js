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
                  Live Classes
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                  <span style={{
                    fontSize: '1.2rem',
                    background: 'var(--gradient-purple-pink)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>🤖</span>
                  AI Practice
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                  <span style={{
                    fontSize: '1.2rem',
                    background: 'var(--gradient-purple-pink)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>👨‍🏫</span>
                  Native Teachers
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                  <span style={{
                    fontSize: '1.2rem',
                    background: 'var(--gradient-purple-pink)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>🏆</span>
                  Certificate
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
            About the Course
          </h2>
          <p className="text-center" style={{
            fontSize: 'var(--font-size-lg)',
            color: 'var(--color-text-tertiary)',
            marginBottom: 'var(--spacing-3xl)',
            maxWidth: '800px',
            margin: '0 auto var(--spacing-3xl)',
          }}>
            Our comprehensive English for IT Professionals course is designed to help IT workers
            improve their technical English skills and communicate confidently in global work environments.
          </p>

          <div className="grid grid-cols-2" style={{ marginBottom: 'var(--spacing-3xl)' }}>
            <div className="card">
              <h3 style={{ marginBottom: 'var(--spacing-md)' }}>🎯 Course Objectives</h3>
              <ul style={{
                paddingLeft: 'var(--spacing-xl)',
                color: 'var(--color-text-secondary)',
                lineHeight: 2,
              }}>
                <li>Master IT-specific vocabulary and technical terminology</li>
                <li>Communicate effectively in meetings and presentations</li>
                <li>Write professional emails and technical documentation</li>
                <li>Excel in English technical interviews</li>
                <li>Participate confidently in international conferences</li>
                <li>Collaborate seamlessly on global projects</li>
              </ul>
            </div>

            <div className="card">
              <h3 style={{ marginBottom: 'var(--spacing-md)' }}>👥 Who Should Enroll?</h3>
              <ul style={{
                paddingLeft: 'var(--spacing-xl)',
                color: 'var(--color-text-secondary)',
                lineHeight: 2,
              }}>
                <li>Software developers and engineers</li>
                <li>DevOps and system administrators</li>
                <li>Project managers in IT</li>
                <li>IT professionals seeking global opportunities</li>
                <li>Anyone working or planning to work in tech</li>
              </ul>
              <div style={{
                marginTop: 'var(--spacing-lg)',
                padding: 'var(--spacing-md)',
                background: 'rgba(245, 158, 11, 0.1)',
                borderRadius: 'var(--radius-md)',
                borderLeft: '4px solid var(--color-accent)',
              }}>
                <strong style={{ color: 'var(--color-accent)' }}>Required:</strong>
                <span style={{ color: 'var(--color-text-secondary)', marginLeft: 'var(--spacing-sm)' }}>
                  Minimum A2 level English proficiency
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
            What You'll Achieve
          </h2>

          <div className="grid grid-cols-3">
            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>🗣️</div>
              <h3>Confident Communication</h3>
              <p>
                Feel confident in daily interactions, meetings, and presentations with colleagues and clients.
              </p>
            </div>

            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>💼</div>
              <h3>Interview Success</h3>
              <p>
                Excel in English technical interviews. Express your skills and experience clearly and professionally.
              </p>
            </div>

            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>📚</div>
              <h3>Technical Vocabulary</h3>
              <p>
                Master IT-specific terms, acronyms, and expressions used in software development and DevOps.
              </p>
            </div>

            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>📝</div>
              <h3>Professional Writing</h3>
              <p>
                Write clear documentation, emails, and code comments. Explain technical concepts effectively.
              </p>
            </div>

            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>🌍</div>
              <h3>Global Opportunities</h3>
              <p>
                Participate confidently in international conferences and collaborate on global projects.
              </p>
            </div>

            <div className="card text-center">
              <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>🎯</div>
              <h3>Problem-Solving Skills</h3>
              <p>
                Explain bugs, propose solutions, and conduct code reviews effectively in English.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: 'var(--spacing-3xl)' }}>
            Course Features
          </h2>

          <div className="grid grid-cols-2" style={{ gap: 'var(--spacing-2xl)' }}>
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                <div style={{ fontSize: '2.5rem' }}>🎥</div>
                <h3 style={{ margin: 0 }}>Live Interactive Classes</h3>
              </div>
              <p>
                Join live online sessions with experienced American teachers.
                Participate in real-time discussions, ask questions, and receive immediate feedback.
              </p>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                <div style={{ fontSize: '2.5rem' }}>👨‍🏫</div>
                <h3 style={{ margin: 0 }}>Native American Teachers</h3>
              </div>
              <p>
                Learn from qualified native English speakers with experience in the IT industry.
                Get authentic pronunciation and cultural insights.
              </p>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                <div style={{ fontSize: '2.5rem' }}>🤖</div>
                <h3 style={{ margin: 0 }}>AI-Powered Practice</h3>
              </div>
              <p>
                Practice anytime with our AI conversation partner. Get instant feedback on grammar,
                vocabulary, and pronunciation between live classes.
              </p>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                <div style={{ fontSize: '2.5rem' }}>📖</div>
                <h3 style={{ margin: 0 }}>Self-Paced Modules</h3>
              </div>
              <p>
                Access vocabulary flashcards, reading exercises, and quizzes at your own pace.
                Reinforce what you learn in live classes.
              </p>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                <div style={{ fontSize: '2.5rem' }}>💻</div>
                <h3 style={{ margin: 0 }}>Technical Requirements</h3>
              </div>
              <p>
                Computer with camera and microphone required for live classes.
                Internet connection for online learning platform access.
              </p>
            </div>

            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                <div style={{ fontSize: '2.5rem' }}>🏆</div>
                <h3 style={{ margin: 0 }}>Certificate of Completion</h3>
              </div>
              <p>
                Receive an official certificate upon successful completion of the course.
                Boost your resume and LinkedIn profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section">
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: 'var(--spacing-xl)' }}>
            Choose Your Plan
          </h2>
          <p className="text-center" style={{
            fontSize: 'var(--font-size-lg)',
            color: 'var(--color-text-tertiary)',
            marginBottom: 'var(--spacing-3xl)',
          }}>
            Select the plan that best fits your learning goals
          </p>

          <div className="grid grid-cols-3">
            {/* Free Plan */}
            <div className="card">
              <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>Free Access</h3>
                <div style={{
                  fontSize: 'var(--font-size-4xl)',
                  fontWeight: '700',
                  marginBottom: 'var(--spacing-sm)',
                }}>
                  $0
                </div>
                <p style={{ color: 'var(--color-text-tertiary)', margin: 0 }}>
                  Try the platform
                </p>
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: 'var(--spacing-xl)',
                color: 'var(--color-text-secondary)',
              }}>
                <li style={{ marginBottom: 'var(--spacing-md)' }}>✓ Self-paced learning modules</li>
                <li style={{ marginBottom: 'var(--spacing-md)' }}>✓ AI conversation practice</li>
                <li style={{ marginBottom: 'var(--spacing-md)' }}>✓ Vocabulary flashcards</li>
                <li style={{ marginBottom: 'var(--spacing-md)' }}>✓ Basic quizzes</li>
                <li style={{ marginBottom: 'var(--spacing-md)', opacity: 0.5 }}>✗ No live classes</li>
                <li style={{ marginBottom: 'var(--spacing-md)', opacity: 0.5 }}>✗ No certificate</li>
              </ul>

              <button className="btn btn-secondary" style={{ width: '100%' }} onClick={(e) => handleEnroll(e, 'free')}>
                Start Free
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
                }}>Most Popular</span>
              </div>

              <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>Standard Course</h3>
                <div style={{
                  fontSize: 'var(--font-size-4xl)',
                  fontWeight: '700',
                  marginBottom: 'var(--spacing-sm)',
                }}>
                  $299
                </div>
                <p style={{ color: 'var(--color-text-tertiary)', margin: 0 }}>
                  8-week program
                </p>
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: 'var(--spacing-xl)',
                color: 'var(--color-text-secondary)',
              }}>
                <li style={{ marginBottom: 'var(--spacing-md)' }}>✓ All free features</li>
                <li style={{ marginBottom: 'var(--spacing-md)' }}>✓ 16 live classes (2/week)</li>
                <li style={{ marginBottom: 'var(--spacing-md)' }}>✓ American native teachers</li>
                <li style={{ marginBottom: 'var(--spacing-md)' }}>✓ Small group sessions (max 10)</li>
                <li style={{ marginBottom: 'var(--spacing-md)' }}>✓ Certificate of completion</li>
                <li style={{ marginBottom: 'var(--spacing-md)' }}>✓ Lifetime module access</li>
              </ul>

              <button className="btn btn-primary" style={{ width: '100%', cursor: 'pointer' }} onClick={(e) => handleEnroll(e, 'standard')}>
                Enroll Now
              </button>
            </div>

            {/* Premium Plan */}
            <div className="card">
              <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>Premium Course</h3>
                <div style={{
                  fontSize: 'var(--font-size-4xl)',
                  fontWeight: '700',
                  marginBottom: 'var(--spacing-sm)',
                }}>
                  $499
                </div>
                <p style={{ color: 'var(--color-text-tertiary)', margin: 0 }}>
                  12-week intensive
                </p>
              </div>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                marginBottom: 'var(--spacing-xl)',
                color: 'var(--color-text-secondary)',
              }}>
                <li style={{ marginBottom: 'var(--spacing-md)' }}>✓ All standard features</li>
                <li style={{ marginBottom: 'var(--spacing-md)' }}>✓ 24 live classes (2/week)</li>
                <li style={{ marginBottom: 'var(--spacing-md)' }}>✓ 4 one-on-one sessions</li>
                <li style={{ marginBottom: 'var(--spacing-md)' }}>✓ Interview preparation module</li>
                <li style={{ marginBottom: 'var(--spacing-md)' }}>✓ Resume review in English</li>
                <li style={{ marginBottom: 'var(--spacing-md)' }}>✓ Priority support</li>
              </ul>

              <button className="btn btn-primary" style={{ width: '100%', cursor: 'pointer' }} onClick={(e) => handleEnroll(e, 'premium')}>
                Enroll Now
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
            Ready to Transform Your Technical English?
          </h2>
          <p style={{
            fontSize: 'var(--font-size-xl)',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--spacing-2xl)',
            maxWidth: '700px',
            margin: '0 auto var(--spacing-2xl)',
          }}>
            Join IT professionals from around the world who are advancing their careers
            with better English communication skills
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={(e) => handleEnroll(e, 'standard')} className="btn btn-primary btn-lg">
              Get Started
            </button>
            <Link href="/dashboard" className="btn btn-secondary btn-lg">
              Try Free Modules
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
            © 2026 English for IT Professionals. Empowering IT workers to communicate globally.
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
