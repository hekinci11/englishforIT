'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import ModuleCard from '../../components/ModuleCard';
import ProgressBar from '../../components/ProgressBar';
import { getProgress, updateStreak, getStats } from '../../lib/progressTracker';

export default function Dashboard() {
    const [progress, setProgress] = useState(null);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const userProgress = updateStreak();
        setProgress(userProgress);
        setStats(getStats());
    }, []);

    if (!progress) {
        return <div>Loading...</div>;
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
                            Welcome back! 👋
                        </h1>
                        <p style={{
                            fontSize: 'var(--font-size-lg)',
                            color: 'var(--color-text-tertiary)',
                        }}>
                            Ready to continue your English learning journey?
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
                                Day Streak
                            </p>
                        </div>

                        <div className="card text-center">
                            <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>
                                🏆
                            </div>
                            <h3 style={{ marginBottom: 'var(--spacing-xs)' }}>
                                Level {progress.user.level}
                            </h3>
                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-tertiary)',
                                margin: 0,
                            }}>
                                Current Level
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
                                Words Learned
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
                                Lessons Complete
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
                                    Level {progress.user.level} Progress
                                </h3>
                                <p style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-text-tertiary)',
                                    margin: 0,
                                }}>
                                    {progress.user.xp} / {xpForNextLevel} XP
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
                        Learning Modules
                    </h2>
                    <div className="grid grid-cols-2" style={{ marginBottom: 'var(--spacing-3xl)' }}>
                        <ModuleCard
                            title="IT Vocabulary"
                            description="Master technical terms with flashcards and quizzes"
                            icon="💻"
                            progress={progress.modules.vocabulary.progress}
                            badge={{ type: 'primary', text: 'Core' }}
                            href="/modules/vocabulary"
                        />
                        <ModuleCard
                            title="Documentation"
                            description="Learn to read and write technical docs"
                            icon="📄"
                            progress={progress.modules.documentation.progress}
                            badge={{ type: 'primary', text: 'Core' }}
                            href="/modules/documentation"
                        />
                        <ModuleCard
                            title="Professional Communication"
                            description="Practice emails, meetings, and presentations"
                            icon="💬"
                            progress={progress.modules.communication.progress}
                            badge={{ type: 'success', text: 'Popular' }}
                            href="/modules/communication"
                        />
                        <ModuleCard
                            title="AI Practice"
                            description="Chat with AI and get instant feedback"
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
                                Recent Achievements
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
