import Link from 'next/link';

export default function ModuleCard({
    title,
    description,
    icon,
    progress = 0,
    badge = null,
    href = '#',
    locked = false
}) {
    return (
        <Link href={locked ? '#' : href} style={{ textDecoration: 'none' }}>
            <div className="card" style={{
                position: 'relative',
                height: '100%',
                cursor: locked ? 'not-allowed' : 'pointer',
                opacity: locked ? 0.6 : 1,
            }}>
                {badge && (
                    <div style={{
                        position: 'absolute',
                        top: 'var(--spacing-md)',
                        right: 'var(--spacing-md)',
                    }}>
                        <span className={`badge badge-${badge.type}`}>
                            {badge.text}
                        </span>
                    </div>
                )}

                <div style={{
                    fontSize: 'var(--font-size-4xl)',
                    marginBottom: 'var(--spacing-md)',
                }}>
                    {icon}
                </div>

                <h3 style={{
                    fontSize: 'var(--font-size-xl)',
                    marginBottom: 'var(--spacing-sm)',
                    color: 'var(--color-text-primary)',
                }}>
                    {title}
                </h3>

                <p style={{
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--color-text-tertiary)',
                    marginBottom: 'var(--spacing-lg)',
                }}>
                    {description}
                </p>

                {progress > 0 && (
                    <div>
                        <div className="progress-bar">
                            <div
                                className="progress-bar-fill"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <p style={{
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-text-muted)',
                            marginTop: 'var(--spacing-sm)',
                            marginBottom: 0,
                        }}>
                            {progress}% Complete
                        </p>
                    </div>
                )}

                {locked && (
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: 'var(--font-size-4xl)',
                    }}>
                        🔒
                    </div>
                )}
            </div>
        </Link>
    );
}
