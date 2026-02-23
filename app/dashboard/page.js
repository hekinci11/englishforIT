'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../lib/LanguageContext';
import { translations } from '../../lib/translations';
import { getProgress, updateStreak, getStats } from '../../lib/progressTracker';

export default function Dashboard() {
    const { language } = useLanguage();
    const t = translations[language].dashboard;
    const [progress, setProgress] = useState(null);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const userProgress = updateStreak();
        setProgress(userProgress);
        setStats(getStats());
    }, []);

    if (!progress) {
        return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {language === 'tr' ? 'Yükleniyor...' : 'Loading...'}
        </div>;
    }

    const xpForNextLevel = progress.user.level * 100;
    const xpProgress = (progress.user.xp / xpForNextLevel) * 100;

    return (
        <>
            <Navbar />

            <div style={{
                minHeight: '100vh',
                paddingTop: 'var(--spacing-2xl)',
                paddingBottom: 'var(--spacing-3xl)',
            }}>
                <div className="container">
                    {/* Welcome Section */}
                    <div style={{
                        marginBottom: 'var(--spacing-3xl)',
                    }}>
                        <h1 style={{
                            fontSize: 'var(--font-size-4xl)',
                            marginBottom: 'var(--spacing-sm)',
                        }}>
                            {t.welcome}
                        </h1>
                        <p style={{
                            fontSize: 'var(--font-size-lg)',
                            color: 'var(--color-text-tertiary)',
                        }}>
                            {t.subtitle}
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-4" style={{ marginBottom: 'var(--spacing-3xl)' }}>
                        <div className="card text-center">
                            <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>
                                ⚡
                            </div>
                            <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>
                                {progress.user.streak}
                            </h3>
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-tertiary)',
                                margin: 0,
                            }}>
                                {t.stats.streak}
                            </p>
                        </div>

                        <div className="card text-center">
                            <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>
                                🏆
                            </div>
                            <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>
                                {language === 'tr' ? `Seviye ${progress.user.level}` : `Level ${progress.user.level}`}
                            </h3>
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-tertiary)',
                                margin: 0,
                            }}>
                                {t.stats.level}
                            </p>
                        </div>

                        <div className="card text-center">
                            <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>
                                📚
                            </div>
                            <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>
                                {stats.wordsLearned}
                            </h3>
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-tertiary)',
                                margin: 0,
                            }}>
                                {t.stats.words}
                            </p>
                        </div>

                        <div className="card text-center">
                            <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>
                                ✅
                            </div>
                            <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>
                                {stats.lessonsCompleted}
                            </h3>
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-tertiary)',
                                margin: 0,
                            }}>
                                {t.stats.lessons}
                            </p>
                        </div>
                    </div>

                    {/* Level Progress */}
                    <div className="card" style={{ marginBottom: 'var(--spacing-3xl)' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 'var(--spacing-md)',
                        }}>
                            <div>
                                <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>
                                    {t.progress.title.replace('{level}', progress.user.level)}
                                </h3>
                                <p style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-text-tertiary)',
                                    margin: 0,
                                }}>
                                    {t.progress.xp.replace('{xp}', progress.user.xp).replace('{total}', xpForNextLevel)}
                                </p>
                            </div>
                            <div className="badge badge-success">
                                {Math.round(xpProgress)}%
                            </div>
                        </div>
                        <ProgressBar progress={Math.round(xpProgress)} color="success" />
                    </div>

                    {/* Learning Modules */}
                    <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>
                        {t.modules.title}
                    </h2>
                    <div className="grid grid-cols-2" style={{ marginBottom: 'var(--spacing-3xl)' }}>
                        <ModuleCard
                            title={t.modules.vocabulary.title}
                            description={t.modules.vocabulary.desc}
                            icon="💻"
                            progress={progress.modules.vocabulary.progress}
                            badge={{ type: 'primary', text: language === 'tr' ? 'Temel' : 'Core' }}
                            href="/modules/vocabulary"
                        />
                        <ModuleCard
                            title={t.modules.documentation.title}
                            description={t.modules.documentation.desc}
                            icon="📄"
                            progress={progress.modules.documentation.progress}
                            badge={{ type: 'primary', text: language === 'tr' ? 'Temel' : 'Core' }}
                            href="/modules/documentation"
                        />
                        <ModuleCard
                            title={t.modules.communication.title}
                            description={t.modules.communication.desc}
                            icon="💬"
                            progress={progress.modules.communication.progress}
                            badge={{ type: 'success', text: language === 'tr' ? 'Popüler' : 'Popular' }}
                            href="/modules/communication"
                        />
                        <ModuleCard
                            title={t.modules.aiPractice.title}
                            description={t.modules.aiPractice.desc}
                            icon="🤖"
                            progress={progress.modules.aiPractice.progress}
                            badge={{ type: 'warning', text: 'AI' }}
                            href="/ai-practice"
                        />
                    </div>

                    {/* Recent Achievements */}
                    {progress.achievements.length > 0 && (
                        <>
                            <h2 style={{ marginBottom: 'var(--spacing-xl)' }}>
                                {t.achievements.title}
                            </h2>
                            <div className="grid grid-cols-3">
                                {progress.achievements.slice(-3).reverse().map((achievement) => (
                                    <div key={achievement.id} className="card text-center">
                                        <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-sm)' }}>
                                            {achievement.icon}
                                        </div>
                                        <h4 style={{ marginBottom: 'var(--spacing-xs)' }}>
                                            {achievement.title}
                                        </h4>
                                        <p style={{
                                            fontSize: 'var(--font-size-sm)',
                                            color: 'var(--color-text-tertiary)',
                                            margin: 0,
                                        }}>
                                            {achievement.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
