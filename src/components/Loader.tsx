import styles from '@/styles/loader.module.css';

function Loader() {
  return (
    <div className="mt-40 flex h-screen justify-center sm:mt-0 sm:items-center">
      <div className={styles.loadingWrapper}>
        <div className={`${styles.bar} ${styles.one}`}></div>
        <div className={`${styles.bar} ${styles.two}`}></div>
        <div className={`${styles.bar} ${styles.three}`}></div>
      </div>
    </div>
  );
}

export default Loader;
