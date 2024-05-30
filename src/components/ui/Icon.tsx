import { FC } from 'react';
import { styled } from 'styled-components';

const IconBody = styled.img<{size?: number, isBlack?: boolean}>`
  display: flex;
  align-items: center;
  width: ${(props) => props.size ? `${props.size}px` : '36px'};
  height: ${(props) => props.size ? `${props.size}px` : '36px'};
  ${(props) => !props.isBlack && 'filter: invert(100%) sepia(1%) saturate(984%) hue-rotate(144deg) brightness(112%) contrast(100%);'}
`

const Icon : FC<{
  icon: string,
  size?: number,
  isBlack?: boolean,
  onClick?:
  VoidFunction
}>  =  ({icon, size, isBlack, onClick})  =>  {
  return (
    <IconBody
      alt='icon'
      isBlack={isBlack}
      onClick={onClick}
      size={size}
      src={icon}
    />
  );
};

export { Icon };
