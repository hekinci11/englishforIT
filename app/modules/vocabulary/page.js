'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import { vocabularyCategories, generateQuiz } from '../../../lib/vocabData';
import { addXP, updateModuleProgress, addWordsLearned } from '../../../lib/progressTracker';

export default function VocabularyModule() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [mode, setMode] = useState('categories'); // categories, flashcards, quiz
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [quiz, setQuiz] = useState([]);
    const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizScore, setQuizScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const startFlashcards = (category) => {
        setSelectedCategory(category);
        setMode('flashcards');
        setCurrentCardIndex(0);
        setIsFlipped(false);
    };

    const startQuiz = (category) => {
        setSelectedCategory(category);
        const questions = generateQuiz(category.id, 5);
        setQuiz(questions);
        setMode('quiz');
        setCurrentQuizIndex(0);
        setQuizScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
    };

    const nextCard = () => {
        if (currentCardIndex < selectedCategory.words.length - 1) {
            setCurrentCardIndex(currentCardIndex + 1);
            setIsFlipped(false);
        } else {
            // Completed flashcards
            addWordsLearned(selectedCategory.words.length);
            updateModuleProgress('vocabulary', `flashcards_${selectedCategory.id}`, 100);
            addXP(30);
            setMode('categories');
        }
    };

    const previousCard = () => {
        if (currentCardIndex > 0) {
            setCurrentCardIndex(currentCardIndex - 1);
            setIsFlipped(false);
        }
    };

    const handleAnswerSelect = (answer) => {
        if (selectedAnswer) return; // Already answered

        setSelectedAnswer(answer);
        const correct = answer === quiz[currentQuizIndex].correctAnswer;

        if (correct) {
            setQuizScore(quizScore + 1);
        }

        setTimeout(() => {
            if (currentQuizIndex < quiz.length - 1) {
                setCurrentQuizIndex(currentQuizIndex + 1);
                setSelectedAnswer(null);
            } else {
                // Quiz completed
                const score = ((quizScore + (correct ? 1 : 0)) / quiz.length) * 100;
                updateModuleProgress('vocabulary', `quiz_${selectedCategory.id}`, score);
                addXP(50);
                setShowResult(true);
            }
        }, 1500);
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
                            IT Vocabulary 💻
                        </h1>
                        <p style={{
                            fontSize: 'var(--font-size-lg)',
                            color: 'var(--color-text-tertiary)',
                        }}>
                            Master essential technical terms with interactive flashcards and quizzes
                        </p>
                    </div>

                    {/* Category Selection */}
                    {mode === 'categories' && (
                        <div className="grid grid-cols-2">
                            {vocabularyCategories.map((category) => (
                                <div key={category.id} className="card">
                                    <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>
                                        {category.icon}
                                    </div>
                                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>
                                        {category.name}
                                    </h3>
                                    <p style={{
                                        fontSize: 'var(--font-size-sm)',
                                        color: 'var(--color-text-tertiary)',
                                        marginBottom: 'var(--spacing-lg)',
                                    }}>
                                        {category.words.length} words to learn
                                    </p>
                                    <div style={{
                                        display: 'flex',
                                        gap: 'var(--spacing-sm)',
                                    }}>
                                        <button
                                            onClick={() => startFlashcards(category)}
                                            className="btn btn-primary btn-sm"
                                            style={{ flex: 1 }}
                                        >
                                            Flashcards
                                        </button>
                                        <button
                                            onClick={() => startQuiz(category)}
                                            className="btn btn-secondary btn-sm"
                                            style={{ flex: 1 }}
                                        >
                                            Quiz
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Flashcard Mode */}
                    {mode === 'flashcards' && selectedCategory && (
                        <div>
                            <button
                                onClick={() => setMode('categories')}
                                className="btn btn-secondary btn-sm"
                                style={{ marginBottom: 'var(--spacing-xl)' }}
                            >
                                ← Back to Categories
                            </button>

                            <div style={{
                                maxWidth: '600px',
                                margin: '0 auto',
                            }}>
                                <div style={{
                                    textAlign: 'center',
                                    marginBottom: 'var(--spacing-lg)',
                                    color: 'var(--color-text-tertiary)',
                                }}>
                                    Card {currentCardIndex + 1} of {selectedCategory.words.length}
                                </div>

                                <div
                                    onClick={() => setIsFlipped(!isFlipped)}
                                    className="card"
                                    style={{
                                        minHeight: '400px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        padding: 'var(--spacing-3xl)',
                                        transition: 'transform var(--transition-base)',
                                    }}
                                >
                                    {!isFlipped ? (
                                        <>
                                            <h2 style={{
                                                fontSize: 'var(--font-size-3xl)',
                                                marginBottom: 'var(--spacing-lg)',
                                            }}>
                                                {selectedCategory.words[currentCardIndex].term}
                                            </h2>
                                            <p style={{
                                                fontSize: 'var(--font-size-lg)',
                                                color: 'var(--color-primary-light)',
                                                marginBottom: 'var(--spacing-xl)',
                                            }}>
                                                {selectedCategory.words[currentCardIndex].pronunciation}
                                            </p>
                                            <p style={{
                                                fontSize: 'var(--font-size-sm)',
                                                color: 'var(--color-text-muted)',
                                            }}>
                                                Click to see definition
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <p style={{
                                                fontSize: 'var(--font-size-xl)',
                                                marginBottom: 'var(--spacing-xl)',
                                                lineHeight: 1.8,
                                            }}>
                                                {selectedCategory.words[currentCardIndex].definition}
                                            </p>
                                            <div style={{
                                                background: 'var(--color-bg-tertiary)',
                                                padding: 'var(--spacing-lg)',
                                                borderRadius: 'var(--radius-md)',
                                                borderLeft: '4px solid var(--color-primary)',
                                            }}>
                                                <p style={{
                                                    fontSize: 'var(--font-size-sm)',
                                                    fontStyle: 'italic',
                                                    margin: 0,
                                                }}>
                                                    "{selectedCategory.words[currentCardIndex].example}"
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div style={{
                                    display: 'flex',
                                    gap: 'var(--spacing-md)',
                                    marginTop: 'var(--spacing-xl)',
                                }}>
                                    <button
                                        onClick={previousCard}
                                        disabled={currentCardIndex === 0}
                                        className="btn btn-secondary"
                                        style={{ flex: 1, opacity: currentCardIndex === 0 ? 0.5 : 1 }}
                                    >
                                        ← Previous
                                    </button>
                                    <button
                                        onClick={nextCard}
                                        className="btn btn-primary"
                                        style={{ flex: 1 }}
                                    >
                                        {currentCardIndex === selectedCategory.words.length - 1 ? 'Finish' : 'Next →'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quiz Mode */}
                    {mode === 'quiz' && !showResult && selectedCategory && quiz.length > 0 && (
                        <div>
                            <button
                                onClick={() => setMode('categories')}
                                className="btn btn-secondary btn-sm"
                                style={{ marginBottom: 'var(--spacing-xl)' }}
                            >
                                ← Back to Categories
                            </button>

                            <div style={{
                                maxWidth: '700px',
                                margin: '0 auto',
                            }}>
                                <div style={{
                                    textAlign: 'center',
                                    marginBottom: 'var(--spacing-xl)',
                                    color: 'var(--color-text-tertiary)',
                                }}>
                                    Question {currentQuizIndex + 1} of {quiz.length}
                                </div>

                                <div className="card" style={{ marginBottom: 'var(--spacing-xl)' }}>
                                    <h3 style={{
                                        fontSize: 'var(--font-size-2xl)',
                                        marginBottom: 'var(--spacing-xl)',
                                        textAlign: 'center',
                                    }}>
                                        {quiz[currentQuizIndex].question}
                                    </h3>

                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 'var(--spacing-md)',
                                    }}>
                                        {quiz[currentQuizIndex].options.map((option, index) => {
                                            const isCorrect = option === quiz[currentQuizIndex].correctAnswer;
                                            const isSelected = option === selectedAnswer;

                                            let backgroundColor = 'var(--color-bg-tertiary)';
                                            let borderColor = 'var(--color-border)';

                                            if (selectedAnswer) {
                                                if (isSelected && isCorrect) {
                                                    backgroundColor = 'rgba(16, 185, 129, 0.2)';
                                                    borderColor = 'var(--color-secondary)';
                                                } else if (isSelected && !isCorrect) {
                                                    backgroundColor = 'rgba(239, 68, 68, 0.2)';
                                                    borderColor = 'var(--color-danger)';
                                                } else if (isCorrect) {
                                                    backgroundColor = 'rgba(16, 185, 129, 0.2)';
                                                    borderColor = 'var(--color-secondary)';
                                                }
                                            }

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => handleAnswerSelect(option)}
                                                    disabled={!!selectedAnswer}
                                                    style={{
                                                        padding: 'var(--spacing-lg)',
                                                        background: backgroundColor,
                                                        border: `2px solid ${borderColor}`,
                                                        borderRadius: 'var(--radius-md)',
                                                        color: 'var(--color-text-primary)',
                                                        fontSize: 'var(--font-size-base)',
                                                        textAlign: 'left',
                                                        cursor: selectedAnswer ? 'default' : 'pointer',
                                                        transition: 'all var(--transition-fast)',
                                                    }}
                                                >
                                                    {option}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quiz Results */}
                    {showResult && (
                        <div style={{
                            maxWidth: '600px',
                            margin: '0 auto',
                            textAlign: 'center',
                        }}>
                            <div className="card">
                                <div style={{ fontSize: '5rem', marginBottom: 'var(--spacing-md)' }}>
                                    {quizScore === quiz.length ? '🎉' : quizScore >= quiz.length / 2 ? '👍' : '📚'}
                                </div>
                                <h2 style={{ marginBottom: 'var(--spacing-md)' }}>
                                    Quiz Complete!
                                </h2>
                                <p style={{
                                    fontSize: 'var(--font-size-2xl)',
                                    marginBottom: 'var(--spacing-lg)',
                                }}>
                                    You scored {quizScore} out of {quiz.length}
                                </p>
                                <p style={{
                                    fontSize: 'var(--font-size-lg)',
                                    color: 'var(--color-text-tertiary)',
                                    marginBottom: 'var(--spacing-2xl)',
                                }}>
                                    {quizScore === quiz.length
                                        ? 'Perfect score! Excellent work! 🌟'
                                        : quizScore >= quiz.length / 2
                                            ? 'Good job! Keep practicing to improve.'
                                            : 'Keep learning! Try the flashcards again.'}
                                </p>
                                <div style={{
                                    display: 'flex',
                                    gap: 'var(--spacing-md)',
                                }}>
                                    <button
                                        onClick={() => startQuiz(selectedCategory)}
                                        className="btn btn-primary"
                                        style={{ flex: 1 }}
                                    >
                                        Try Again
                                    </button>
                                    <button
                                        onClick={() => setMode('categories')}
                                        className="btn btn-secondary"
                                        style={{ flex: 1 }}
                                    >
                                        Back to Categories
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
