import styles from './Container.module.scss';

export default function Container({ children }) {
  return (
    <main className={styles.container}>
      {children}
    </main>
  )
}
