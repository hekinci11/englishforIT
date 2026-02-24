'use client';

import { useLanguage } from '../../../lib/LanguageContext';
import { translations } from '../../../lib/translations';
import { updateModuleProgress, addXP } from '../../../lib/progressTracker';
import { documentationSamples } from '../../../lib/documentationData';

export default function DocumentationModule() {
    const { language } = useLanguage();
    const t = translations[language].documentation;
    const samples = documentationSamples[language] || documentationSamples.en;

    const handleComplete = (docId) => {
        updateModuleProgress('documentation', `doc_${docId}`, 100);
        addXP(25);
        alert(language === 'tr' ? 'Pratik tamamlandı! +25 XP kazanıldı!' : 'Practice completed! +25 XP earned!');
    };

    return (
        <>
            <Navbar />

            <div style={{
                minHeight: '100vh',
                paddingTop: 'var(--spacing-2xl)',
                paddingBottom: 'var(--spacing-3xl)',
            }}>
                <div className="container">
                    {/* Header */}
                    <div style={{ marginBottom: 'var(--spacing-3xl)' }}>
                        <h1 style={{
                            fontSize: 'var(--font-size-4xl)',
                            marginBottom: 'var(--spacing-sm)',
                        }}>
                            {t.title}
                        </h1>
                        <p style={{
                            fontSize: 'var(--font-size-lg)',
                            color: 'var(--color-text-tertiary)',
                        }}>
                            {t.subtitle}
                        </p>
                    </div>

                    {/* Documentation Samples */}
                    <div className="grid grid-cols-1" style={{ gap: 'var(--spacing-2xl)' }}>
                        {samples.map((doc) => (
                            <div key={doc.id} className="card">
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-md)',
                                    marginBottom: 'var(--spacing-xl)',
                                }}>
                                    <div style={{ fontSize: '2.5rem' }}>{doc.icon}</div>
                                    <h2 style={{ margin: 0 }}>{doc.title}</h2>
                                </div>

                                {/* Documentation Content */}
                                <div style={{
                                    background: 'var(--color-bg-primary)',
                                    padding: 'var(--spacing-xl)',
                                    borderRadius: 'var(--radius-md)',
                                    marginBottom: 'var(--spacing-xl)',
                                    maxHeight: '500px',
                                    overflowY: 'auto',
                                    fontFamily: 'monospace',
                                    fontSize: 'var(--font-size-sm)',
                                    lineHeight: 1.8,
                                    whiteSpace: 'pre-wrap',
                                }}>
                                    {doc.content}
                                </div>

                                {/* Comprehension Questions */}
                                <div>
                                    <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>
                                        {t.comprehensionCheck}
                                    </h3>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 'var(--spacing-lg)',
                                    }}>
                                        {doc.questions.map((q, idx) => (
                                            <details
                                                key={idx}
                                                style={{
                                                    background: 'var(--color-bg-tertiary)',
                                                    padding: 'var(--spacing-lg)',
                                                    borderRadius: 'var(--radius-md)',
                                                    border: '1px solid var(--color-border)',
                                                }}
                                            >
                                                <summary style={{
                                                    cursor: 'pointer',
                                                    fontWeight: '600',
                                                    fontSize: 'var(--font-size-base)',
                                                    marginBottom: 'var(--spacing-md)',
                                                }}>
                                                    {t.question.replace('{num}', idx + 1)}: {q.question}
                                                </summary>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: 'var(--spacing-sm)',
                                                    marginTop: 'var(--spacing-md)',
                                                }}>
                                                    {q.options.map((option, optIdx) => (
                                                        <div
                                                            key={optIdx}
                                                            style={{
                                                                padding: 'var(--spacing-md)',
                                                                background: option === q.correct
                                                                    ? 'rgba(16, 185, 129, 0.2)'
                                                                    : 'var(--color-bg-primary)',
                                                                borderRadius: 'var(--radius-sm)',
                                                                border: `1px solid ${option === q.correct ? 'var(--color-secondary)' : 'var(--color-border)'}`,
                                                            }}
                                                        >
                                                            {option}
                                                            {option === q.correct && (
                                                                <span style={{
                                                                    marginLeft: 'var(--spacing-sm)',
                                                                    color: 'var(--color-secondary)',
                                                                }}>
                                                                    ✓ {t.correct}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </details>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleComplete(doc.id)}
                                    className="btn btn-primary"
                                    style={{ marginTop: 'var(--spacing-xl)' }}
                                >
                                    {t.markAsComplete} +25 XP
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Tips Section */}
                    <div className="card" style={{
                        marginTop: 'var(--spacing-3xl)',
                        background: 'rgba(99, 102, 241, 0.1)',
                        borderColor: 'var(--color-primary)',
                    }}>
                        <h3 style={{ marginBottom: 'var(--spacing-md)' }}>
                            {t.tips.title}
                        </h3>
                        <ul style={{
                            paddingLeft: 'var(--spacing-xl)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 2,
                        }}>
                            {t.tips.items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
