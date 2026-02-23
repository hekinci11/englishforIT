'use client';

import { useLanguage } from '../../../lib/LanguageContext';
import { translations } from '../../../lib/translations';
import { updateModuleProgress, addXP } from '../../../lib/progressTracker';

const documentationSamples = [
    {
        id: 'api-docs',
        title: 'API Documentation',
        icon: '📡',
        content: `# User Authentication API

## Overview
This API provides endpoints for user authentication including registration, login, and password reset functionality.

## Base URL
\`\`\`
https://api.example.com/v1
\`\`\`

## Authentication
All authenticated endpoints require a Bearer token in the Authorization header:
\`\`\`
Authorization: Bearer YOUR_ACCESS_TOKEN
\`\`\`

## Endpoints

### POST /auth/register
Creates a new user account.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
\`\`\`

**Response (201 Created):**
\`\`\`json
{
  "user": {
    "id": "usr_123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\``,
        questions: [
            {
                question: 'What HTTP method is used to create a new user?',
                options: ['GET', 'POST', 'PUT', 'DELETE'],
                correct: 'POST',
            },
            {
                question: 'What status code is returned on successful registration?',
                options: ['200', '201', '204', '400'],
                correct: '201',
            },
            {
                question: 'Where should the access token be included?',
                options: ['Query parameter', 'Request body', 'Authorization header', 'Cookie'],
                correct: 'Authorization header',
            },
        ],
    },
    {
        id: 'readme',
        title: 'README Documentation',
        icon: '📖',
        content: `# Project Name

A modern web application built with Next.js and React for managing team workflows.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/username/project-name.git
cd project-name
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a \`.env.local\` file in the root directory:
\`\`\`env
DATABASE_URL=your_database_url
API_KEY=your_api_key
\`\`\`

4. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

## Project Structure

\`\`\`
/app        - Next.js app router pages
/components - Reusable React components
/lib        - Utility functions and helpers
/public     - Static assets
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request`,
        questions: [
            {
                question: 'What is the minimum required Node.js version?',
                options: ['v14', 'v16', 'v18', 'v20'],
                correct: 'v18',
            },
            {
                question: 'What command starts the development server?',
                options: ['npm start', 'npm dev', 'npm run dev', 'npm serve'],
                correct: 'npm run dev',
            },
            {
                question: 'Where should environment variables be stored?',
                options: ['.env.local file', 'package.json', 'config.js', 'README.md'],
                correct: '.env.local file',
            },
        ],
    },
];

export default function DocumentationModule() {
    const { language } = useLanguage();
    const t = translations[language].documentation;

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
                        {documentationSamples.map((doc) => (
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
