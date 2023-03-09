// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { Banner } from '@flyele-nx/ui';
import { add } from '@flyele-nx/utils';
import NxWelcome from './nx-welcome';

export function App() {
  console.log(add(2, 7));

  return (
    <>
      <NxWelcome title="web" />
      <Banner />
      <div />
    </>
  );
}

export default App;
