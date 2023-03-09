import styles from './banner.module.scss';
import { add } from '@flyele-nx/utils';

/* eslint-disable-next-line */
export interface BannerProps {}

export function Banner(props: BannerProps) {
  return (
    <div className={styles['container']}>
      <div>{add(2, 7)}</div>
      <h1>Welcome to Banner!</h1>
    </div>
  );
}

export default Banner;
