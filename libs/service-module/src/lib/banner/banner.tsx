import styles from './banner.module.scss';

import { UsercApi } from '@flyele-nx/service';

/* eslint-disable-next-line */
export interface BannerProps {}

export function Banner(props: BannerProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Banner!</h1>
      <div
        onClick={() => {
          UsercApi.getCurrentDate();
        }}
      >
        get time
      </div>
    </div>
  );
}

export default Banner;
