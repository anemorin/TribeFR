import { FC } from 'react';
import { styled } from 'styled-components';

const Spinner = styled.div`
  margin: 0 auto;
  width: 24px;
  height: 24px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid black;
  border-radius: 50%;
  animation: spin 1s infinite linear;
  /* margin-top: 15px; */

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Loader : FC = () => {
  return (
    <Spinner>
    </Spinner>
  );
};


export { Loader };
