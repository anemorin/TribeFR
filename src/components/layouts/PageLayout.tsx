import { Outlet, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import UseStores from '../../hooks/useStores';
import { useEffect } from 'react';
import { observer } from 'mobx-react';

const PageBody = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

const PageLayout = () => {
  const { userStore } = UseStores();
  const navigate = useNavigate();

  useEffect(() => {
    if (userStore.isAuthorized) {
      if (!userStore.user?.id) {
        userStore.GetUserInfo();
      }
      if (window.location.pathname !== '/')  {
        navigate('/');
      }
    } else {
      navigate('/auth/login');
    }
  }, [userStore.token])

  return (
    <PageBody>
      <Outlet />
    </PageBody>
  )
};

export default observer(PageLayout);
