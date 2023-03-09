import styles from './service-module.module.scss';

/* eslint-disable-next-line */
export interface ServiceModuleProps {}

export function ServiceModule(props: ServiceModuleProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to ServiceModule!</h1>
    </div>
  );
}

export default ServiceModule;
