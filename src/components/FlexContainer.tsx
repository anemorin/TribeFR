import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

const FlexContainer : FC<{children: ReactNode}> = ({children}) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export { FlexContainer };
