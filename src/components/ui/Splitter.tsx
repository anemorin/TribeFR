import { FC } from 'react';
import styled from 'styled-components';

const SplitterComponent = styled.div`
  background-color: black;
  width: 100%;
  height: 2px;
`;

const Splitter : FC = () => (
  <SplitterComponent />
);

export default Splitter;
