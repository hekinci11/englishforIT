'use client';

import { useLanguage } from '../../../lib/LanguageContext';
import { translations } from '../../../lib/translations';
import { updateModuleProgress, addXP } from '../../../lib/progressTracker';

const communicationScenarios = [
    {
        id: 'email-bug-report',
        title: 'Bug Report Email',
        icon: '📧',
        scenario: `Write an email to your team about a critical bug in production.

**Context:**
- The login system is down
- It started 30 minutes ago
- You've identified the cause
- You need immediate attention

**Key phrases to use:**
- "I'm writing to inform you..."
- "We're currently experiencing..."
- "The root cause appears to be..."
- "Immediate action is required..."`,
        template: `Subject: [URGENT] Production Login System Down

Hi Team,

I'm writing to inform you about a critical issue affecting our production environment.

**Issue:** [Describe the problem]

**Impact:** [Who is affected]

**Root Cause:** [What you found]

**Proposed Solution:** [Your recommendation]

**Timeline:** [When you expect to fix it]

Please let me know if you need any additional information.

Best regards,
[Your Name]`,
        tips: [
            'Use clear, direct subject lines with [URGENT] or [CRITICAL] tags',
            'Start with the problem, not pleasantries',
            'Use bullet points for clarity',
            'Include impact and proposed solutions',
            'Specify timeline expectations',
        ],
    },
    {
        id: 'standup-update',
        title: 'Daily Standup Update',
        icon: '🗣️',
        scenario: `Prepare your daily standup update for the team meeting.

**Your situation:**
- Yesterday: Completed user authentication feature
- Today: Will work on password reset functionality
- Blocker: Waiting for design mockups from the design team

**Follow the format:**
1. What I did yesterday
2. What I'm doing today
3. Any blockers`,
        template: `Yesterday:
- [List completed tasks]
- [Any achievements or milestones]

Today:
- [Planned tasks]
- [What you'll focus on]

Blockers:
- [Any issues preventing progress]
- [Who you're waiting on]

Quick note: [Any additional context]`,
        tips: [
            'Be concise - aim for 1-2 minutes maximum',
            'Use past tense for yesterday, future/present for today',
            'Be specific about blockers and who can help',
            'Mention dependencies on other team members',
            'Use action verbs: completed, implemented, fixed, working on',
        ],
    },
    {
        id: 'code-review',
        title: 'Code Review Comments',
        icon: '👀',
        scenario: `Write constructive feedback for a colleague's pull request.

**The PR:**
- Adds a new API endpoint
- Has some security concerns
- Missing error handling
- Good overall structure

**Remember:**
- Be professional and constructive
- Explain WHY, not just WHAT
- Suggest solutions, don't just point out problems`,
        template: `Overall: This PR looks good! The API structure is clean and follows our conventions.

**Suggestions:**

1. **Security Concern (Line 45):**
   Current: [What they did]
   Issue: [Why it's a problem]
   Suggestion: [How to fix it]

2. **Error Handling (Line 78):**
   Consider adding try-catch block here to handle potential database errors gracefully.

3. **Minor:** Variable naming at line 23 - consider using \`userId\` instead of \`uid\` for clarity.

**Nitpicks:**
- Missing JSDoc comment for the main function
- Could extract validation logic into a separate function

Great work overall! Let me know if you have questions.`,
        tips: [
            'Start with something positive',
            'Use "we/our" instead of "you/your" to be collaborative',
            'Categorize feedback: Critical, Suggestions, Nitpicks',
            'Explain the reasoning behind your comments',
            'Offer to pair program on complex issues',
            'Use phrases like "Consider...", "What do you think about...", "Suggestion:"',
        ],
    },
    {
        id: 'tech-presentation',
        title: 'Technical Presentation',
        icon: '📊',
        scenario: `Prepare a 5-minute presentation about a new feature you built.

**Feature:** Real-time notification system
**Audience:** Entire engineering team (25 people)
**Goal:** Explain the architecture and how others can use it`,
        template: `**Slide 1: Title**
"Real-Time Notification System: Architecture & Integration"

**Slide 2: Problem Statement**
"Before: Users had to refresh to see updates
Now: Instant notifications using WebSockets"

**Slide 3: Architecture Overview**
- Frontend: WebSocket client
- Backend: Node.js WebSocket server
- Message Queue: Redis for scalability

**Slide 4: How to Integrate**
1. Import the NotificationClient
2. Initialize with user credentials
3. Subscribe to events
4. Handle incoming messages

**Slide 5: Demo**
[Live demonstration]

**Slide 6: Q&A**
"Questions? I'm available after for detailed discussions"

**Speaking Notes:**
- Start with: "Good morning everyone, today I'll be presenting..."
- Transitions: "Moving on to...", "Let's take a look at...", "Now I'll show you..."
- Closing: "To summarize...", "In conclusion...", "Thank you for your time"`,
        tips: [
            'Start with a clear problem statement',
            'Use simple language, explain acronyms first time',
            'Show visual diagrams when possible',
            'Include live demos if appropriate',
            'Leave time for questions',
            'Practice pronunciation of technical terms beforehand',
            'Speak slowly and clearly - especially if English isn\'t your first language',
        ],
    },
];

export default function CommunicationModule() {
    const { language } = useLanguage();
    const t = translations[language].communication;
    const [selectedScenario, setSelectedScenario] = useState(null);
    const [userResponse, setUserResponse] = useState('');

    const handleComplete = (scenarioId) => {
        if (userResponse.trim().length < 50) {
            alert(t.minCharactersError.replace('{count}', 50));
            return;
        }

        updateModuleProgress('communication', `scenario_${scenarioId}`, 100);
        addXP(30);
        alert(t.writingSuccess);
        setUserResponse('');
        setSelectedScenario(null);
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

                    {/* Scenario Selection */}
                    {!selectedScenario && (
                        <div className="grid grid-cols-2">
                            {communicationScenarios.map((scenario) => (
                                <div key={scenario.id} className="card">
                                    <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>
                                        {scenario.icon}
                                    </div>
                                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>
                                        {scenario.title}
                                    </h3>
                                    <p style={{
                                        fontSize: 'var(--font-size-sm)',
                                        color: 'var(--color-text-tertiary)',
                                        marginBottom: 'var(--spacing-lg)',
                                        minHeight: '60px',
                                    }}>
                                        {scenario.scenario.split('\n')[0]}
                                    </p>
                                    <button
                                        onClick={() => setSelectedScenario(scenario)}
                                        className="btn btn-primary btn-sm"
                                    >
                                        {t.startPractice}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Scenario Practice */}
                    {selectedScenario && (
                        <div>
                            <button
                                onClick={() => {
                                    setSelectedScenario(null);
                                    setUserResponse('');
                                }}
                                className="btn btn-secondary btn-sm"
                                style={{ marginBottom: 'var(--spacing-xl)' }}
                            >
                                {t.back}
                            </button>

                            <div className="grid grid-cols-2" style={{ alignItems: 'start' }}>
                                {/* Left Column - Instructions */}
                                <div>
                                    <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--spacing-md)',
                                            marginBottom: 'var(--spacing-lg)',
                                        }}>
                                            <div style={{ fontSize: '2.5rem' }}>{selectedScenario.icon}</div>
                                            <h2 style={{ margin: 0 }}>{selectedScenario.title}</h2>
                                        </div>

                                        <div style={{
                                            background: 'var(--color-bg-tertiary)',
                                            padding: 'var(--spacing-lg)',
                                            borderRadius: 'var(--radius-md)',
                                            marginBottom: 'var(--spacing-lg)',
                                            whiteSpace: 'pre-line',
                                            lineHeight: 1.8,
                                        }}>
                                            {selectedScenario.scenario}
                                        </div>

                                        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>{t.template}</h4>
                                        <div style={{
                                            background: 'var(--color-bg-primary)',
                                            padding: 'var(--spacing-lg)',
                                            borderRadius: 'var(--radius-md)',
                                            fontFamily: 'monospace',
                                            fontSize: 'var(--font-size-sm)',
                                            whiteSpace: 'pre-wrap',
                                            lineHeight: 1.8,
                                            marginBottom: 'var(--spacing-lg)',
                                        }}>
                                            {selectedScenario.template}
                                        </div>

                                        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>{t.tipsHeader}</h4>
                                        <ul style={{
                                            paddingLeft: 'var(--spacing-xl)',
                                            color: 'var(--color-text-secondary)',
                                            lineHeight: 2,
                                        }}>
                                            {selectedScenario.tips.map((tip, idx) => (
                                                <li key={idx}>{tip}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Right Column - Practice Area */}
                                <div className="card" style={{ position: 'sticky', top: 'var(--spacing-xl)' }}>
                                    <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>
                                        {language === 'tr' ? 'Yanıtınız' : 'Your Response'}
                                    </h3>
                                    <textarea
                                        value={userResponse}
                                        onChange={(e) => setUserResponse(e.target.value)}
                                        placeholder={t.placeholder}
                                        style={{
                                            width: '100%',
                                            minHeight: '400px',
                                            padding: 'var(--spacing-lg)',
                                            background: 'var(--color-bg-primary)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: 'var(--radius-md)',
                                            color: 'var(--color-text-primary)',
                                            fontSize: 'var(--font-size-base)',
                                            fontFamily: 'var(--font-family-base)',
                                            lineHeight: 1.8,
                                            resize: 'vertical',
                                            marginBottom: 'var(--spacing-lg)',
                                        }}
                                    />
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: 'var(--spacing-md)',
                                    }}>
                                        <span style={{
                                            fontSize: 'var(--font-size-sm)',
                                            color: 'var(--color-text-tertiary)',
                                        }}>
                                            {userResponse.length} {t.characters}
                                        </span>
                                        <button
                                            onClick={() => handleComplete(selectedScenario.id)}
                                            className="btn btn-primary"
                                            disabled={userResponse.trim().length < 50}
                                            style={{
                                                opacity: userResponse.trim().length < 50 ? 0.5 : 1,
                                            }}
                                        >
                                            {t.submit}
                                        </button>
                                    </div>
                                    <p style={{
                                        fontSize: 'var(--font-size-sm)',
                                        color: 'var(--color-text-muted)',
                                        margin: 0,
                                        textAlign: 'center',
                                    }}>
                                        {t.minCharactersNotice.replace('{count}', 50)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
