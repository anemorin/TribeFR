import { FC, useEffect, useRef } from 'react';
import { PageHeader } from '../components/PageHeader';
import { TribesWindow } from '../components/TribesWindow';
import UseStores from '../hooks/useStores';

const Home : FC = () => {
  const { userStore } = UseStores();

  const jwtUpdateIntervalId = useRef<NodeJS.Timer | null>(null);

  const startJwtUpdateInterval = () => {
    jwtUpdateIntervalId.current = setInterval(() => {
      userStore.Refresh();
    }, 10 * 60 * 1000); // 10 minutes in milliseconds
  };

  const stopJwtUpdateInterval = () => {
    if (jwtUpdateIntervalId.current) {
      // clearInterval(jwtUpdateIntervalId.current);
      jwtUpdateIntervalId.current = null;
    }
  };

  useEffect(() => {
    if (userStore.refreshToken) {
      userStore.Refresh();
      startJwtUpdateInterval();
    }
    return () => {
      stopJwtUpdateInterval()
    };
  }, [])

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', paddingBottom: '20px' }}>
      <PageHeader />
      <TribesWindow />
    </div>
  );
};

export default Home;
