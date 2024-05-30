import { FC, useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import UseStores from '../hooks/useStores';
import { Loader } from './Loader';
import { observer } from 'mobx-react';
import Title from './ui/Title';
import { TitleType } from '../types/commonTypes';
import ProfileItem from './ProfileItem';
import { SmallProfileItem } from './SmallProfileItem';
import { UserPositionType, UserType } from '../types/TribesTypes';
import { Button } from './ui/Button';
import { runInAction } from 'mobx';

const TribesListBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items:  center;
  justify-content: center;
  gap: 12px;
  padding: 24px 12px;
  border: 1px solid black;
  border-radius: 5px;
  height: 100%;
  min-height: 100%;
  width: 40%;
`;

const TribesTreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 12px;
`;

const UsersList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const TribeTree : FC = observer(() => {
  const { tribesStore, userStore } = UseStores();
  const currentStore = tribesStore.tribes?.find((tribe) => tribe.id === tribesStore.selectedTribeId);
  const user = currentStore?.positions && currentStore?.positions.find((pos) => {
    return pos.userId === userStore.user?.id;
  })
  const [currentUser, setCurrentUser] = useState<UserPositionType>();

  useEffect(() => {
    currentStore?.GetTribeUsers();
    currentStore?.GetParticipantByIds(currentUser?.parentIds ?? user?.parentIds ?? []);
    currentStore?.GetChildrenByIds(currentUser?.childrenIds ?? user?.childrenIds ?? []);
  }, [currentUser, currentStore])

  useEffect(() => {
    runInAction(() => {
      if (currentStore) {
        currentStore.selectedUser = (currentUser ?? user);
      }
    })
  }, [currentUser, user])

  const CurrentUserCard = useMemo(() => {
    return (
      <ProfileItem
        user={currentStore?.users.find((id) => id.id  ===  (currentUser?.userId ?? user?.userId  ?? '')) ?? {} as UserType}
        withBorder
      />
    )
  }, [currentStore?.users, currentUser])



  return (
    <TribesListBody>
      {
        !tribesStore.selectedTribeId.length
          ? (
            <div>Выберите трайб</div>
          )
          : tribesStore.state?.isLoading
            ? (
              <Loader />
            )
            : (
              <TribesTreeContainer>
                {
                  !!currentStore?.participant?.length && (
                    <>
                      <Title
                        text={'Руководители'}
                        type={TitleType.SubTitle}
                      />
                      <UsersList>
                        {currentStore?.participant.map((parent) => {
                          return (
                            <SmallProfileItem
                              key={parent.id}
                              onClick={()  =>  {
                                setCurrentUser(currentStore.positions?.find((pos) => {
                                  return pos.userId === parent.id;
                                } ));
                              }}
                              user={parent}
                            />
                          )
                        })}
                      </UsersList>
                    </>
                  )
                }
                <Title
                  text={'Пользователь'}
                  type={TitleType.SubTitle}
                />

                {CurrentUserCard}

                {
                  !!currentStore?.children?.length && (
                    <>
                      <Title
                        text={'Подчиненные'}
                        type={TitleType.SubTitle}
                      />
                      <UsersList>
                        {currentStore?.children.map((children) => {
                          return (
                            <SmallProfileItem
                              key={children.id}
                              user={children}
                            />
                          )
                        })}
                      </UsersList>
                    </>
                  )
                }
                {
                  currentUser?.userId && currentUser?.userId !== user?.userId && (
                    <Button
                      onClick={() => setCurrentUser(user)}
                      text="Вернуться к себе"
                    />
                  )
                }

              </TribesTreeContainer>
            )
      }
    </TribesListBody>
  );
});

export { TribeTree };
