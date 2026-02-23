// IT Vocabulary Database - Common terms IT professionals need
export const vocabularyCategories = [
    {
        id: 'programming',
        name: 'Programming Terms',
        nameTr: 'Programlama Terimleri',
        icon: '💻',
        words: [
            {
                term: 'Deprecated',
                pronunciation: '/ˈdeprəkeɪtɪd/',
                definition: 'A feature or function that is outdated and should no longer be used',
                example: 'This API endpoint is deprecated and will be removed in version 3.0',
                difficulty: 'intermediate',
            },
            {
                term: 'Refactor',
                pronunciation: '/riːˈfæktər/',
                definition: 'To restructure existing code without changing its external behavior',
                example: 'We need to refactor this module to improve code readability',
                difficulty: 'intermediate',
            },
            {
                term: 'Edge Case',
                pronunciation: '/edʒ keɪs/',
                definition: 'A problem or situation that occurs only at extreme parameters',
                example: 'We found an edge case where the app crashes with empty input',
                difficulty: 'advanced',
            },
            {
                term: 'Scalability',
                pronunciation: '/ˌskeɪləˈbɪləti/',
                definition: 'The capability of a system to handle growing amounts of work',
                example: 'We need to improve the scalability of our database',
                difficulty: 'intermediate',
            },
            {
                term: 'Deploy',
                pronunciation: '/dɪˈplɔɪ/',
                definition: 'To release software to a production environment',
                example: 'We will deploy the new version tomorrow morning',
                difficulty: 'beginner',
            },
        ],
    },
    {
        id: 'devops',
        name: 'DevOps & Infrastructure',
        nameTr: 'DevOps ve Altyapı',
        icon: '⚙️',
        words: [
            {
                term: 'Pipeline',
                pronunciation: '/ˈpaɪplaɪn/',
                definition: 'A set of automated processes that allow developers to deploy code',
                example: 'Our CI/CD pipeline runs tests automatically on every commit',
                difficulty: 'intermediate',
            },
            {
                term: 'Containerization',
                pronunciation: '/kənˌteɪnəraɪˈzeɪʃən/',
                definition: 'Packaging software code with all dependencies into containers',
                example: 'We use Docker for containerization of our microservices',
                difficulty: 'advanced',
            },
            {
                term: 'Orchestration',
                pronunciation: '/ˌɔːrkɪˈstreɪʃən/',
                definition: 'Automated configuration and management of computer systems',
                example: 'Kubernetes provides container orchestration for our cluster',
                difficulty: 'advanced',
            },
            {
                term: 'Load Balancer',
                pronunciation: '/loʊd ˈbælənsər/',
                definition: 'A device that distributes network traffic across multiple servers',
                example: 'The load balancer ensures even distribution of requests',
                difficulty: 'intermediate',
            },
        ],
    },
    {
        id: 'meetings',
        name: 'Meeting Phrases',
        nameTr: 'Toplantı Kalıpları',
        icon: '👥',
        words: [
            {
                term: 'Touch base',
                pronunciation: '/tʌtʃ beɪs/',
                definition: 'To briefly make contact or discuss something',
                example: "Let's touch base next week about the project status",
                difficulty: 'beginner',
            },
            {
                term: 'Circle back',
                pronunciation: '/ˈsɜːrkəl bæk/',
                definition: 'To return to a topic or issue at a later time',
                example: "We'll circle back to this issue in our next meeting",
                difficulty: 'beginner',
            },
            {
                term: 'Bandwidth',
                pronunciation: '/ˈbændwɪdθ/',
                definition: '(Informal) The mental capacity or time available for a task',
                example: "I don't have the bandwidth to take on another project right now",
                difficulty: 'intermediate',
            },
            {
                term: 'Actionable',
                pronunciation: '/ˈækʃənəbəl/',
                definition: 'Able to be acted on; providing a basis for action',
                example: 'We need actionable insights from the user research',
                difficulty: 'intermediate',
            },
        ],
    },
    {
        id: 'agile',
        name: 'Agile & Project Management',
        nameTr: 'Agile ve Proje Yönetimi',
        icon: '📊',
        words: [
            {
                term: 'Sprint',
                pronunciation: '/sprɪnt/',
                definition: 'A set period of time during which specific work must be completed',
                example: 'We completed 15 story points in the last sprint',
                difficulty: 'beginner',
            },
            {
                term: 'Backlog',
                pronunciation: '/ˈbækˌlɔːɡ/',
                definition: 'A list of tasks or features waiting to be done',
                example: 'We need to prioritize the product backlog for next quarter',
                difficulty: 'beginner',
            },
            {
                term: 'Retrospective',
                pronunciation: '/ˌretrəˈspektɪv/',
                definition: 'A meeting to discuss what went well and what can be improved',
                example: 'In the retrospective, the team decided to improve code review process',
                difficulty: 'intermediate',
            },
            {
                term: 'Stakeholder',
                pronunciation: '/ˈsteɪkˌhoʊldər/',
                definition: 'A person with an interest or concern in the project',
                example: 'We need to get approval from all stakeholders before proceeding',
                difficulty: 'intermediate',
            },
        ],
    },
];

// Generate quiz questions from vocabulary
export function generateQuiz(categoryId, count = 5) {
    const category = vocabularyCategories.find(c => c.id === categoryId);
    if (!category) return [];

    const shuffled = [...category.words].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(count, category.words.length));

    return selected.map(word => ({
        question: `What does "${word.term}" mean?`,
        correctAnswer: word.definition,
        options: [
            word.definition,
            // Add some plausible wrong answers
            ...getRandomDefinitions(categoryId, word.term, 3)
        ].sort(() => 0.5 - Math.random()),
        term: word.term,
        example: word.example,
    }));
}

function getRandomDefinitions(categoryId, excludeTerm, count) {
    const allWords = vocabularyCategories
        .flatMap(c => c.words)
        .filter(w => w.term !== excludeTerm);

    const shuffled = allWords.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count).map(w => w.definition);
}

export function getWordsByDifficulty(difficulty) {
    return vocabularyCategories.flatMap(cat =>
        cat.words
            .filter(w => w.difficulty === difficulty)
            .map(w => ({ ...w, category: cat.name }))
    );
}
