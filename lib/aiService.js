// Mock AI Service - Replace with real AI API integration later
// This provides simulated AI responses for conversation practice

const conversationTemplates = [
    {
        trigger: ['hello', 'hi', 'hey'],
        responses: [
            "Hello! I'm your AI English practice partner. Let's discuss some technical topics in English. What would you like to talk about today?",
            "Hi there! Ready to practice your technical English? We can discuss programming, DevOps, or your current projects.",
        ],
    },
    {
        trigger: ['project', 'work', 'working on'],
        responses: [
            "That sounds interesting! Can you tell me more about the technologies you're using in this project?",
            "Great! What challenges are you facing with this project? Let's discuss them in English.",
            "Excellent! How would you describe your project architecture to a non-technical stakeholder?",
        ],
    },
    {
        trigger: ['bug', 'error', 'issue', 'problem'],
        responses: [
            "I understand debugging can be frustrating. Can you describe the error message you're seeing? Try to use technical vocabulary.",
            "Let's practice explaining technical issues. Walk me through the steps to reproduce this bug.",
            "Good debugging practice! How would you explain this problem to your team in a daily standup meeting?",
        ],
    },
    {
        trigger: ['deploy', 'deployment', 'production'],
        responses: [
            "Deployment is a critical process! Can you describe your deployment pipeline using technical terms?",
            "Let's discuss deployment strategies. What's the difference between continuous deployment and continuous delivery?",
            "Great topic! How would you announce a production deployment to your team via email?",
        ],
    },
];

const technicalQuestions = [
    "Can you explain what 'refactoring' means and give an example from your experience?",
    "How would you describe the concept of 'scalability' to a junior developer?",
    "What's the difference between 'deprecation' and 'removal' in software development?",
    "Can you walk me through a typical code review process in English?",
    "How would you explain 'technical debt' to a product manager?",
    "Describe a time when you had to debug a critical production issue. Use proper technical vocabulary.",
];

const pronunciationFeedback = [
    {
        word: 'deprecated',
        commonMistakes: [
            "Many non-native speakers stress the wrong syllable. Remember: DE-pre-ca-ted (stress on first syllable)",
            "The 'ca' sound is /keɪ/ not /ka/. Practice: DEP-ruh-kay-ted",
        ],
    },
    {
        word: 'cache',
        commonMistakes: [
            "It's pronounced 'cash' (/kæʃ/), not 'catch' or 'cachet'",
            "Think of it like 'cash' money - same pronunciation!",
        ],
    },
    {
        word: 'query',
        commonMistakes: [
            "Pronounce it as KWEER-ee, not KWER-ee",
            "The 'quer' rhymes with 'fear' or 'beer'",
        ],
    },
];

export async function getAIResponse(userMessage) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const message = userMessage.toLowerCase();

    // Check for conversation triggers
    for (const template of conversationTemplates) {
        if (template.trigger.some(trigger => message.includes(trigger))) {
            const response = template.responses[Math.floor(Math.random() * template.responses.length)];
            return {
                text: response,
                type: 'conversation',
                feedback: null,
            };
        }
    }

    // Default responses
    const defaultResponses = [
        "That's an interesting point! Can you elaborate using more technical terminology?",
        "I see. How would you explain that concept to someone from a different department?",
        "Good! Now try to rephrase that using more professional language.",
        technicalQuestions[Math.floor(Math.random() * technicalQuestions.length)],
    ];

    return {
        text: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
        type: 'conversation',
        feedback: null,
    };
}

export async function checkPronunciation(word) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find pronunciation feedback
    const feedback = pronunciationFeedback.find(
        p => p.word.toLowerCase() === word.toLowerCase()
    );

    if (feedback) {
        return {
            word: feedback.word,
            feedback: feedback.commonMistakes[0],
            score: Math.floor(Math.random() * 30) + 70, // Random score 70-100
        };
    }

    return {
        word: word,
        feedback: "Great pronunciation! Keep practicing to maintain fluency.",
        score: Math.floor(Math.random() * 20) + 80, // Random score 80-100
    };
}

export async function getGrammarSuggestion(text) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Simple grammar checks (mock)
    const suggestions = [];

    if (text.includes('very good')) {
        suggestions.push({
            original: 'very good',
            suggestion: 'excellent',
            reason: 'Use more precise adjectives in professional communication',
        });
    }

    if (text.includes('bad')) {
        suggestions.push({
            original: 'bad',
            suggestion: 'suboptimal / inefficient',
            reason: 'Use more professional terminology',
        });
    }

    if (text.match(/\bi am\b/i) && text.match(/\bthink\b/i)) {
        suggestions.push({
            original: 'I am think',
            suggestion: 'I think',
            reason: 'Avoid using continuous form with "think" when expressing opinion',
        });
    }

    return suggestions;
}

export function getPersonalizedPath(userLevel = 'beginner', interests = []) {
    const paths = {
        beginner: [
            { module: 'Basic IT Vocabulary', priority: 1, duration: '2 weeks' },
            { module: 'Common Email Phrases', priority: 2, duration: '1 week' },
            { module: 'Simple Code Comments', priority: 3, duration: '1 week' },
        ],
        intermediate: [
            { module: 'Advanced Technical Terms', priority: 1, duration: '2 weeks' },
            { module: 'Meeting Presentations', priority: 2, duration: '2 weeks' },
            { module: 'Documentation Writing', priority: 3, duration: '3 weeks' },
        ],
        advanced: [
            { module: 'Technical Leadership Communication', priority: 1, duration: '3 weeks' },
            { module: 'Architecture Discussions', priority: 2, duration: '3 weeks' },
            { module: 'Interview Practice', priority: 3, duration: '2 weeks' },
        ],
    };

    return paths[userLevel] || paths.beginner;
}
