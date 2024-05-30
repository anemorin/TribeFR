import { FC } from 'react';
import { icons } from '../enums';
import styled from 'styled-components';
import { Icon } from './ui/Icon';
import { UserType } from '../types/TribesTypes';

const ProfileBlock = styled.div<{withBorder?: boolean}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;

  width: fit-content;

  font-size: 12px;

  border: 1px solid black;
  border-radius: 6px;
`;

const SmallProfileItem : FC<{user: UserType, withIcon?: boolean, onClick?: VoidFunction}> = ({ user, withIcon, onClick }) => {
  return (
    <ProfileBlock
      key={user.id}
      onClick={onClick}
    >
      {user.email.split('@')[0]}
      {withIcon && (
        <Icon
          icon={icons.close}
          isBlack={true}
          onClick={() => {
            console.log('Удаление')
          }}
          size={24}
        />
      )}
    </ProfileBlock>
  );
};

export { SmallProfileItem };
