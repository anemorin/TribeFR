import { observer } from 'mobx-react';
import { FC, ReactNode } from 'react';
import { styled } from 'styled-components';

type Props = {
  onClick?: () => void;
  disabled?: boolean;
  text?: ReactNode;
  noPadding?: boolean;
}

const ButtonContainer = styled.button<{noPadding?: boolean}>`
  padding: ${(props) => props.noPadding ? '2px' : '12px'};
  /* width: 80%; */
  background-color: black;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button: FC<Props> = observer(({ onClick, disabled, text, noPadding }) => (
  <ButtonContainer
    disabled={disabled}
    noPadding={noPadding}
    onClick={onClick}
  >
    {text}
  </ButtonContainer>
));

export { Button }