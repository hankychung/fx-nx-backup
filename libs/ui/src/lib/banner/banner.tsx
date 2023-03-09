import styles from './banner.module.scss';

/* eslint-disable-next-line */
export interface BannerProps {}

export function Banner(props: BannerProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Banner!</h1>
      {/* <div>{add(2, 3)}</div> */}
    </div>
  );
}

export default Banner;
