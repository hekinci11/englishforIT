'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import { getAIResponse, checkPronunciation } from '../../lib/aiService';
import { updateModuleProgress, addXP } from '../../lib/progressTracker';

export default function AIPractice() {
    const [messages, setMessages] = useState([
        {
            role: 'ai',
            text: "Hello! I'm your AI English practice partner. Let's have a conversation about technical topics! Tell me about a project you're currently working on, or ask me to help you practice specific scenarios.",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationCount, setConversationCount] = useState(0);
    const [selectedWord, setSelectedWord] = useState('');
    const [pronunciationResult, setPronunciationResult] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = {
            role: 'user',
            text: input,
            timestamp: new Date(),
        };

        setMessages([...messages, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await getAIResponse(input);

            const aiMessage = {
                role: 'ai',
                text: response.text,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, aiMessage]);

            // Track conversation and award XP
            const newCount = conversationCount + 1;
            setConversationCount(newCount);

            if (newCount % 5 === 0) {
                addXP(20);
                updateModuleProgress('aiPractice', `conversation_${newCount}`, 10);
            }
        } catch (error) {
            console.error('Error getting AI response:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckPronunciation = async () => {
        if (!selectedWord.trim()) return;

        setPronunciationResult({ loading: true });
        const result = await checkPronunciation(selectedWord);
        setPronunciationResult(result);
        addXP(10);
    };

    const quickPrompts = [
        "Let's discuss my current project",
        "Help me practice explaining a bug",
        "I want to practice meeting phrases",
        "Can we talk about code reviews?",
        "Help me prepare for an interview",
    ];

    return (
        <>
            <Navbar />

            <div style={{
                minHeight: 'calc(100vh - 80px)',
                paddingTop: 'var(--spacing-2xl)',
                paddingBottom: 'var(--spacing-xl)',
            }}>
                <div className="container">
                    {/* Header */}
                    <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                        <h1 style={{
                            fontSize: 'var(--font-size-4xl)',
                            marginBottom: 'var(--spacing-sm)',
                        }}>
                            AI Practice Partner 🤖
                        </h1>
                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-md)',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                        }}>
                            <span className="badge badge-success">
                                {conversationCount} conversations
                            </span>
                            <span style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-text-tertiary)',
                            }}>
                                +20 XP every 5 messages
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-3" style={{ alignItems: 'start', gap: 'var(--spacing-xl)' }}>
                        {/* Left Column - Chat */}
                        <div style={{ gridColumn: 'span 2' }}>
                            <div className="card" style={{
                                height: '600px',
                                display: 'flex',
                                flexDirection: 'column',
                                padding: 0,
                                overflow: 'hidden',
                            }}>
                                {/* Messages Area */}
                                <div style={{
                                    flex: 1,
                                    overflowY: 'auto',
                                    padding: 'var(--spacing-xl)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 'var(--spacing-md)',
                                }}>
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                display: 'flex',
                                                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                                            }}
                                        >
                                            <div style={{
                                                maxWidth: '80%',
                                                padding: 'var(--spacing-lg)',
                                                background: message.role === 'user'
                                                    ? 'var(--gradient-primary)'
                                                    : 'var(--color-bg-tertiary)',
                                                color: 'var(--color-text-primary)',
                                                borderRadius: 'var(--radius-lg)',
                                                borderBottomRightRadius: message.role === 'user' ? 0 : 'var(--radius-lg)',
                                                borderBottomLeftRadius: message.role === 'ai' ? 0 : 'var(--radius-lg)',
                                            }}>
                                                <p style={{
                                                    margin: 0,
                                                    lineHeight: 1.6,
                                                    fontSize: 'var(--font-size-base)',
                                                }}>
                                                    {message.text}
                                                </p>
                                                <p style={{
                                                    margin: 0,
                                                    marginTop: 'var(--spacing-sm)',
                                                    fontSize: 'var(--font-size-xs)',
                                                    opacity: 0.7,
                                                }}>
                                                    {message.timestamp.toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                        }}>
                                            <div style={{
                                                padding: 'var(--spacing-lg)',
                                                background: 'var(--color-bg-tertiary)',
                                                borderRadius: 'var(--radius-lg)',
                                                borderBottomLeftRadius: 0,
                                            }}>
                                                <div className="pulse">AI is typing...</div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>

                                {/* Input Area */}
                                <div style={{
                                    padding: 'var(--spacing-lg)',
                                    borderTop: '1px solid var(--color-border)',
                                    background: 'var(--color-bg-secondary)',
                                }}>
                                    {/* Quick Prompts */}
                                    <div style={{
                                        display: 'flex',
                                        gap: 'var(--spacing-sm)',
                                        marginBottom: 'var(--spacing-md)',
                                        flexWrap: 'wrap',
                                    }}>
                                        {quickPrompts.map((prompt, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setInput(prompt)}
                                                className="badge badge-primary"
                                                style={{
                                                    cursor: 'pointer',
                                                    padding: 'var(--spacing-sm) var(--spacing-md)',
                                                }}
                                            >
                                                {prompt}
                                            </button>
                                        ))}
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        gap: 'var(--spacing-md)',
                                    }}>
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                            placeholder="Type your message in English..."
                                            style={{
                                                flex: 1,
                                                padding: 'var(--spacing-md)',
                                                background: 'var(--color-bg-primary)',
                                                border: '1px solid var(--color-border)',
                                                borderRadius: 'var(--radius-md)',
                                                color: 'var(--color-text-primary)',
                                                fontSize: 'var(--font-size-base)',
                                            }}
                                            disabled={isLoading}
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="btn btn-primary"
                                            disabled={isLoading || !input.trim()}
                                            style={{
                                                opacity: (!input.trim() || isLoading) ? 0.5 : 1,
                                            }}
                                        >
                                            Send →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Tools */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--spacing-lg)',
                        }}>
                            {/* Pronunciation Checker */}
                            <div className="card">
                                <h3 style={{ marginBottom: 'var(--spacing-md)' }}>
                                    🎤 Pronunciation Check
                                </h3>
                                <p style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-text-tertiary)',
                                    marginBottom: 'var(--spacing-md)',
                                }}>
                                    Enter a technical word to get pronunciation feedback
                                </p>
                                <input
                                    type="text"
                                    value={selectedWord}
                                    onChange={(e) => setSelectedWord(e.target.value)}
                                    placeholder="e.g., deprecated"
                                    style={{
                                        width: '100%',
                                        padding: 'var(--spacing-md)',
                                        background: 'var(--color-bg-primary)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'var(--color-text-primary)',
                                        fontSize: 'var(--font-size-base)',
                                        marginBottom: 'var(--spacing-md)',
                                    }}
                                />
                                <button
                                    onClick={handleCheckPronunciation}
                                    className="btn btn-secondary btn-sm"
                                    style={{ width: '100%' }}
                                    disabled={!selectedWord.trim()}
                                >
                                    Check Pronunciation
                                </button>

                                {pronunciationResult && !pronunciationResult.loading && (
                                    <div style={{
                                        marginTop: 'var(--spacing-md)',
                                        padding: 'var(--spacing-md)',
                                        background: 'var(--color-bg-tertiary)',
                                        borderRadius: 'var(--radius-md)',
                                        borderLeft: `4px solid ${pronunciationResult.score >= 80 ? 'var(--color-secondary)' : 'var(--color-warning)'}`,
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            marginBottom: 'var(--spacing-sm)',
                                        }}>
                                            <strong>{pronunciationResult.word}</strong>
                                            <span className={`badge ${pronunciationResult.score >= 80 ? 'badge-success' : 'badge-warning'}`}>
                                                {pronunciationResult.score}%
                                            </span>
                                        </div>
                                        <p style={{
                                            fontSize: 'var(--font-size-sm)',
                                            margin: 0,
                                            lineHeight: 1.6,
                                        }}>
                                            {pronunciationResult.feedback}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Tips Card */}
                            <div className="card" style={{
                                background: 'rgba(99, 102, 241, 0.1)',
                                borderColor: 'var(--color-primary)',
                            }}>
                                <h3 style={{ marginBottom: 'var(--spacing-md)' }}>
                                    💡 Practice Tips
                                </h3>
                                <ul style={{
                                    paddingLeft: 'var(--spacing-lg)',
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-text-secondary)',
                                    lineHeight: 2,
                                    margin: 0,
                                }}>
                                    <li>Describe your projects in detail</li>
                                    <li>Explain technical concepts</li>
                                    <li>Practice common scenarios</li>
                                    <li>Don't worry about mistakes!</li>
                                    <li>Focus on clarity over perfection</li>
                                </ul>
                            </div>

                            {/* Stats Card */}
                            <div className="card text-center">
                                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-sm)' }}>
                                    🎯
                                </div>
                                <h4 style={{ marginBottom: 'var(--spacing-xs)' }}>
                                    {conversationCount}
                                </h4>
                                <p style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-text-tertiary)',
                                    margin: 0,
                                }}>
                                    Total Conversations
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
