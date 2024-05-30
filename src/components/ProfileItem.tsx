import { FC } from 'react';
import { icons } from '../enums';
import styled from 'styled-components';
import { UserType } from '../types/TribesTypes';
import { FlexContainer } from './FlexContainer';
import { Icon } from './ui/Icon';
import { observer } from 'mobx-react';

const Profile = styled.div`
  border-radius: 50%;
  border: 1px solid black;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfileBlock = styled.div<{withBorder?: boolean}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  width: 100%;
  padding: 4px 8px;

  border: ${(props) => (props.withBorder? '1px solid black' : 'none')};
  border-radius: 6px;
`;

const ProfileItem : FC<{user: UserType, withIcon?: boolean, withBorder?: boolean}> = ({ user, withIcon, withBorder }) => {
  return (
    <ProfileBlock
      key={user.id}
      withBorder={withBorder}
    >
      <FlexContainer>
        <Profile>
          <Icon
            icon={icons.profile}
            size={24}
            isBlack
          />
        </Profile>
        {user.email}
      </FlexContainer>
      {withIcon && (
        <Icon
          icon={icons.close}
          isBlack={true}
          onClick={() => {

          }}
          size={24}
        />
      )}
    </ProfileBlock>
  );
};

export default observer(ProfileItem);
