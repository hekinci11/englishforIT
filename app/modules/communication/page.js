'use client';

import { useLanguage } from '../../../lib/LanguageContext';
import { translations } from '../../../lib/translations';
import { updateModuleProgress, addXP } from '../../../lib/progressTracker';
import { communicationScenarios } from '../../../lib/communicationData';

export default function CommunicationModule() {
    const { language } = useLanguage();
    const t = translations[language].communication;
    const scenarios = communicationScenarios[language] || communicationScenarios.en;
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
                            {scenarios.map((scenario) => (
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
