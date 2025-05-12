import styles from './loader.module.css';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-black">
      <div className={styles.loader}>
        <span className={styles['loader-text']}>loading</span>
        <span className={styles.load}></span>
      </div>
    </div>
  );
};

export default Loader;
