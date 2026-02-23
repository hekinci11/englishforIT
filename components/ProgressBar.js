export default function ProgressBar({ progress, color = 'primary', showLabel = false }) {
    const gradients = {
        primary: 'var(--gradient-primary)',
        success: 'var(--gradient-success)',
        secondary: 'var(--gradient-secondary)',
    };

    return (
        <div style={{ width: '100%' }}>
            {showLabel && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--spacing-sm)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-secondary)',
                }}>
                    <span>Progress</span>
                    <span style={{ fontWeight: '600' }}>{progress}%</span>
                </div>
            )}
            <div className="progress-bar">
                <div
                    className="progress-bar-fill"
                    style={{
                        width: `${progress}%`,
                        background: gradients[color] || gradients.primary,
                    }}
                />
            </div>
        </div>
    );
}
