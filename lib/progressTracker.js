// User Progress Tracking System
// Uses localStorage for client-side persistence

const STORAGE_KEY = 'englishforit_progress';

export function initializeProgress() {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }

    // Default initial progress
    const initialProgress = {
        user: {
            name: 'IT Professional',
            level: 1,
            xp: 0,
            streak: 0,
            lastVisit: new Date().toISOString(),
            joinDate: new Date().toISOString(),
        },
        modules: {
            vocabulary: { progress: 0, completed: [], score: 0 },
            documentation: { progress: 0, completed: [], score: 0 },
            communication: { progress: 0, completed: [], score: 0 },
            codeComments: { progress: 0, completed: [], score: 0 },
            aiPractice: { progress: 0, conversationCount: 0, score: 0 },
        },
        achievements: [],
        stats: {
            totalStudyTime: 0, // in minutes
            wordsLearned: 0,
            lessonsCompleted: 0,
            quizzesPassed: 0,
        },
    };

    saveProgress(initialProgress);
    return initialProgress;
}

export function saveProgress(progress) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function getProgress() {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initializeProgress();
}

export function addXP(amount) {
    const progress = getProgress();
    if (!progress) return;

    progress.user.xp += amount;

    // Level up logic
    const xpForNextLevel = progress.user.level * 100;
    if (progress.user.xp >= xpForNextLevel) {
        progress.user.level += 1;
        progress.user.xp -= xpForNextLevel;

        // Award achievement for level up
        addAchievement({
            id: `level_${progress.user.level}`,
            date: new Date().toISOString(),
        });
    }

    saveProgress(progress);
    return progress;
}

export function updateModuleProgress(moduleId, completed, score = 0) {
    const progress = getProgress();
    if (!progress || !progress.modules[moduleId]) return;

    const module = progress.modules[moduleId];

    if (completed && !module.completed.includes(completed)) {
        module.completed.push(completed);
        progress.stats.lessonsCompleted += 1;
        addXP(20); // Award XP for completing a lesson
    }

    module.score = Math.max(module.score, score);
    module.progress = Math.min(100, module.progress + 10);

    saveProgress(progress);
    return progress;
}

export function updateStreak() {
    const progress = getProgress();
    if (!progress) return;

    const lastVisit = new Date(progress.user.lastVisit);
    const today = new Date();
    const daysSinceLastVisit = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));

    if (daysSinceLastVisit === 1) {
        // Consecutive day
        progress.user.streak += 1;

        // Award achievements for streaks
        if (progress.user.streak === 7) {
            addAchievement({
                id: 'streak_7',
                date: new Date().toISOString(),
            });
        } else if (progress.user.streak === 30) {
            addAchievement({
                id: 'streak_30',
                date: new Date().toISOString(),
            });
        }
    } else if (daysSinceLastVisit > 1) {
        // Streak broken
        progress.user.streak = 1;
    }

    progress.user.lastVisit = today.toISOString();
    saveProgress(progress);
    return progress;
}

export function addAchievement(achievement) {
    const progress = getProgress();
    if (!progress) return;

    // Check if achievement already exists
    if (progress.achievements.find(a => a.id === achievement.id)) {
        return;
    }

    progress.achievements.push(achievement);
    saveProgress(progress);
}

export function getAchievements() {
    const progress = getProgress();
    return progress?.achievements || [];
}

export function addWordsLearned(count) {
    const progress = getProgress();
    if (!progress) return;

    progress.stats.wordsLearned += count;

    // Award achievements for words learned
    if (progress.stats.wordsLearned >= 50 && !progress.achievements.find(a => a.id === 'words_50')) {
        addAchievement({
            id: 'words_50',
            date: new Date().toISOString(),
        });
    }

    saveProgress(progress);
    return progress;
}

export function getStats() {
    const progress = getProgress();
    if (!progress) return null;

    // Calculate additional stats
    const totalProgress = Object.values(progress.modules).reduce(
        (sum, module) => sum + module.progress,
        0
    ) / Object.keys(progress.modules).length;

    return {
        ...progress.stats,
        totalProgress: Math.round(totalProgress),
        level: progress.user.level,
        xp: progress.user.xp,
        streak: progress.user.streak,
    };
}
