import { FC, useEffect, useMemo } from 'react';
import { styled } from 'styled-components';
import UseStores from '../hooks/useStores';
import { Loader } from './Loader';
import { observer } from 'mobx-react';
import Title from './ui/Title';
import { TitleType } from '../types/commonTypes';
import ProfileItem from './ProfileItem';
import { SmallProfileItem } from './SmallProfileItem';
import { Button } from './ui/Button';
import { UserType } from '../types/TribesTypes';

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
  gap: 4px;
`

const TribeTree : FC = observer(() => {
  const { tribesStore, userStore } = UseStores();
  const user = tribesStore.selectedTribe?.positions && tribesStore.selectedTribe?.positions.find((pos) => {
    return pos.userId === userStore.user?.id;
  })
  // const [currentUser, setCurrentUser] = useState<UserPositionType>();

  useEffect(() => {
    tribesStore.selectedTribe?.GetTribeUsers();
    tribesStore.selectedTribe?.GetParticipantByIds(tribesStore.selectedTribe?.selectedUser?.parentIds ??  []);
    tribesStore.selectedTribe?.GetChildrenByIds(tribesStore.selectedTribe?.selectedUser?.childrenIds ?? []);
  }, [tribesStore.selectedTribe?.selectedUser, tribesStore.selectedTribe])

  // useEffect(() => {
  //   runInAction(() => {
  //     if (tribesStore.selectedTribe) {
  //       tribesStore.selectedTribe.selectedUser = (tribesStore.selectedTribe?.selectedUser);
  //     }
  //   })
  // }, [currentUser, user, tribesStore.selectedTribeId])

  const CurrentUserCard = useMemo(() => {
    return (
      <ProfileItem
        user={tribesStore.selectedTribe?.users.find((id) => id.id  ===  tribesStore.selectedTribe?.selectedUser?.userId) ?? {} as UserType}
        withBorder
      />
    )
  }, [tribesStore.selectedTribe?.users, tribesStore.selectedTribe?.selectedUser])

  const participants = useMemo(() => {
    return !!tribesStore.selectedTribe?.participant?.length && (
      <>
        <Title
          text={'Руководители'}
          type={TitleType.SubTitle}
        />
        <UsersList>
          {tribesStore.selectedTribe?.participant.map((parent) => {
            return (
              <SmallProfileItem
                key={parent.id}
                onClick={()  =>  {
                  if (tribesStore?.selectedTribe) {
                    tribesStore.selectedTribe.selectedUser = tribesStore.selectedTribe?.positions?.find((val) => {
                      return val.userId === parent.id;
                    })
                  }
                }}
                user={parent}
              />
            )
          })}
        </UsersList>
      </>
    )
  }, [tribesStore.selectedTribe?.participant, tribesStore.selectedTribeId])

  const childrenMemo = useMemo(() => {
    return !!tribesStore.selectedTribe?.children?.length && (
      <>
        <Title
          text={'Подчиненные'}
          type={TitleType.SubTitle}
        />
        <UsersList>
          {tribesStore.selectedTribe?.children.map((children) => {
            return (
              <SmallProfileItem
                key={children.id}
                onClick={()  =>  {
                  if (tribesStore?.selectedTribe) {
                    tribesStore.selectedTribe.selectedUser = tribesStore.selectedTribe?.positions?.find((val) => {
                      return val.userId === children.id;
                    })
                  }
                }}
                user={children}
              />
            )
          })}
        </UsersList>
      </>
    )

  }, [tribesStore.selectedTribe?.children, tribesStore.selectedTribeId])



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
                {participants}
                <Title
                  text={'Пользователь'}
                  type={TitleType.SubTitle}
                />

                {CurrentUserCard}

                {childrenMemo}
                {
                  tribesStore.selectedTribe?.selectedUser?.userId && tribesStore.selectedTribe?.selectedUser?.userId !== user?.userId && (
                    <Button
                      onClick={() => {
                        if (tribesStore.selectedTribe) {
                          tribesStore.selectedTribe.selectedUser = tribesStore.selectedTribe?.positions?.find((val) => {
                            return val.userId === userStore.user?.id;
                          })
                        }
                      }}
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
