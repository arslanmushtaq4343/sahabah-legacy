import type { ReactNode } from 'react';
import styles from './PageHeader.module.css';

type Props = {
  title: ReactNode;
  subtitle?: ReactNode;
  rightSlot?: ReactNode;
};

export function PageHeader({ title, subtitle, rightSlot }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.titleBlock}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {rightSlot && <div className={styles.right}>{rightSlot}</div>}
    </header>
  );
}
