import styles from './reg.log.layout.module.css'

export const RegLogLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={styles.layout}>{children}</div>
}
