import styles from './PageSkeleton.module.css';

export function PageSkeleton() {
  return (
    <div className={styles.skeleton} role="status" aria-label="Loading page content">
      <div className={styles.hero} />
      <div className={styles.grid}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={styles.card} />
        ))}
      </div>
    </div>
  );
}
