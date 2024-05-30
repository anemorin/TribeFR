import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import { styled } from "styled-components";
import UseStores from "../hooks/useStores";
import { Icon } from "./ui/Icon";
import { icons } from "../enums";
import ModalSearchWindow from "./Modal";
import { Formik, Form } from 'formik';
import TextInput  from './ui/fields/TextField';
import * as Yup from 'yup';
import { Button } from "./ui/Button";
import { Loader } from "./Loader";
import Splitter from "./ui/Splitter";
import ProfileItem from "./ProfileItem";
import { FlexContainer } from "./FlexContainer";
import CustomSelect from "./ui/Select";

type Props = {
  tribeName: string,
  id: string,
};

const TribeItemContainer = styled.div<{isSelected?: boolean}>`
  display:  flex;
  padding: 12px;
  width: 100%;
  background-color: ${(props) => (props.isSelected ? "black" : "white")};

  border: 1px solid black;
  min-height: 62px;

  align-items:  center;
  cursor:  pointer;

  justify-content: space-between;

  border-radius: 6px;

  p {
    color: ${(props) => (props.isSelected ? "white" : "black")};
  }
`

export const TribeForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  width: 100%;

  div {
    width: 100%;
  }
`

const ModalStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 24px;
`

const UsersList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  overflow: auto;
  width: 100%;
  max-height: 400px;
`;

const TribeItem : FC<Props> = observer(
  ({ id, tribeName }) => {
    const { tribesStore, userStore } = UseStores();
    const [showModal, setShowModal]  = useState(false);
    const [showAddUserModal, setShowAddUserModal]  = useState(false);
    const isSelected = tribesStore.selectedTribeId === id;
    const thisStore = tribesStore.tribes?.find((tribe) => tribe.id === id);

    const [searchQuery, setSearchQuery] = useState("");
    const [addedUserId, setAddedUserId] = useState("");

    useEffect(() => {
      const initialFetch = async () => {
        if (thisStore && showModal)
          await thisStore.GetTribeUsers();
      }

      initialFetch()
    }, [showModal])

    useEffect(() => {
      const initialFetch = async () =>  {
        if (searchQuery) {
          await thisStore?.FindUserByNames(searchQuery);
        }
      }

      initialFetch()
    }, [searchQuery])

    return (
      <TribeItemContainer
        key={id}
        isSelected={isSelected}
        onClick={() => tribesStore.selectedTribeId = id}
      >
        <p>{tribeName}</p>
        {
          isSelected && (
            <Icon
              icon={icons.edit}
              onClick={() => setShowModal(true)}
              size={32}
            />
          )
        }
        {
          showModal && (
            <ModalSearchWindow
              noOutsideClose={false}
              onClose={() => setShowModal(false)}
              title="Редактирование"
            >
              <ModalStyles>
                <Formik
                  initialValues={{
                    TribeName: tribesStore.tribes?.find((tribe) => tribe.id === id)?.name,
                  }}
                  onSubmit={async (values, { setSubmitting }) => {
                    await tribesStore.ChangeNameTribe(id, values.TribeName!);
                    if (tribesStore.state?.isSuccess) {
                      tribesStore.GetTribes();
                    }
                    setShowModal(false);
                    setSubmitting(false);
                  }}
                  validationSchema={Yup.object({
                    TribeName: Yup.string().required('Поле обязательно для заполнения'),
                  })}
                >
                  {({
                    isSubmitting,
                  }) => (
                    <TribeForm>
                      <TextInput
                        disable={thisStore?.creatorId !== userStore.user?.id}
                        label="Название"
                        name="TribeName"
                      />
                      {
                        thisStore?.creatorId === userStore.user?.id && (
                          <Button
                            disabled={isSubmitting}
                            text={tribesStore.state?.isLoading ? <Loader /> : 'Изменить'}
                          />
                        )
                      }

                    </TribeForm>
                  )}
                </Formik>
                <Splitter />
                <UsersList>
                  {
                    thisStore?.users?.map((user) => (
                      <ProfileItem
                        key={user.id}
                        user={user}
                        withBorder
                        // withIcon
                      />
                    ))
                  }
                </UsersList>
                {
                  thisStore?.creatorId === userStore.user?.id && (
                    <>
                      <Splitter />

                      <FlexContainer>
                        <Button
                          onClick={async () => {
                            await tribesStore.DeleteTribe(id);
                            if (tribesStore.state?.isSuccess) {
                              tribesStore.GetTribes();
                            }
                            setShowModal(false);
                          }}
                          text={tribesStore.state?.isLoading ? <Loader /> : 'Удалить трайб'}
                        />
                        <Button
                          onClick={() => setShowAddUserModal(true)}
                          text={tribesStore.state?.isLoading ? <Loader /> : 'Добавить пользователя'}
                        />
                      </FlexContainer>
                    </>
                  )
                }

              </ModalStyles>
            </ModalSearchWindow>
          )
        }
        {
          showAddUserModal && (
            <ModalSearchWindow
              height={500}
              onClose={() => {
                setShowAddUserModal(false)
              }}
              title="Добавить пользователя"
              width={300}
            >
              <ModalStyles>
                <CustomSelect
                  isClearable={false}
                  isSearchable={true}
                  onChangeValue={(value) => {
                    setAddedUserId(value.value)
                  }}
                  onInputChange={(value) => {
                    setSearchQuery(value);
                  }}
                  options={thisStore?.preparedUsers ?? []}
                  placeholder="Введите почту пользователя"
                />
                <Button
                  disabled={tribesStore.state?.isLoading}
                  onClick={async () => {
                    if (userStore.user?.id) {
                      await thisStore?.AddUser(addedUserId, userStore.user?.id)
                      await tribesStore.GetTribes()
                      setShowAddUserModal(false)
                    }
                  }}
                  text={tribesStore.state?.isLoading ? <Loader /> : 'Добавить пользователя'}
                />
              </ModalStyles>
            </ModalSearchWindow>
          )
        }
      </TribeItemContainer>
    );
  }
)

export { TribeItem };
