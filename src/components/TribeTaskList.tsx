import { FC, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Button } from './ui/Button';
import UseStores from '../hooks/useStores';
import ModalSearchWindow from './Modal';
import CustomSelect from './ui/Select';
import { Formik } from 'formik';
import { TribeForm } from './TribeItem';
import TextInput  from './ui/fields/TextField';
import { Loader } from './Loader';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import Title from './ui/Title';
import { TitleType } from '../types/commonTypes';

const TribesListBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 12px;
  border: 1px solid black;
  border-radius: 5px;
  height: 100%;
  min-height: 100%;
  width: 32%;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  gap: 12px;
  width: 100%;
  min-height: 95%;
  overflow: hidden;
`;

const EmptyPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const TaskItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border: 1px solid black;
  border-radius: 6px;
  padding: 12px;
  width: 100%;
`

const TaskDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 12px;
`

const TribeTaskList : FC = observer(() => {
  const { userStore, tribesStore  } = UseStores();
  const [ showModal, setShowModal ] = useState(false);
  const [performer, setPerformer] = useState('');
  const currentStore = tribesStore.tribes?.find((tribe) => tribe.id === tribesStore.selectedTribeId);

  useEffect(() => {
    const initialFetch = async () => {
      if (currentStore && currentStore.id && currentStore.selectedUser) {
        await currentStore?.tasksStore?.GetTasks(currentStore.selectedUser?.userId, currentStore.id);
      }
    }

    initialFetch();
  }, [currentStore?.selectedUser])

  return (
    <TribesListBody>
      <TaskList>
        {
          currentStore
            ? (
              <>
                {
                  currentStore.state?.isLoading ? (
                    <Loader />
                  ) : currentStore?.tasksStore?.tasks?.map((task) => {
                    return (
                      <TaskItem key={task.id}>
                        <Title
                          text={task.name}
                          type={TitleType.SubTitle}
                        />
                        <TaskDescription>
                          <Title
                            text='Описание'
                            type={TitleType.CardTitle}
                          />
                          <p>{task.content.sections[0].input.content}</p>
                        </TaskDescription>
                      </TaskItem>
                    )
                  })
                }
              </>
            ) : (
              <EmptyPlaceholder>
                Выберите трайб
              </EmptyPlaceholder>
            )
        }
        {/* {
          currentStore?.tasksStore?.tasks?.map((task) => {
            return (
              <div key={task.id}>
                <Title
                  text={task.name}
                  type={TitleType.SubTitle}
                />
                <p>Описание</p>
                <p>{task.content.sections[0].input.content}</p>
              </div>
            )
          })
        } */}
      </TaskList>
      {
        currentStore && (
          <Button
            onClick={() => setShowModal(true)}
            text='Добавить таску'
          />
        )
      }

      {
        showModal && (
          <ModalSearchWindow
            onClose={() => setShowModal(false)}
            title='Добавить таску'
          >
            <TaskList>
              <CustomSelect
                isClearable={false}
                isSearchable={false}
                onChangeValue={(value) => {
                  setPerformer(value.value);
                }}
                options={currentStore?.addTaskListUsers(userStore.user?.id ?? '') ?? []}
                placeholder='Выберите пользователя'
              />
              <Formik
                initialValues={{
                  TribeName: '',
                  TribeDescription: '',
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  if (currentStore && currentStore.id) {
                    await currentStore?.tasksStore?.CreateTask(values.TribeName, values.TribeDescription, currentStore?.id, performer)
                  }
                  if (currentStore && currentStore.id) {
                    await currentStore?.tasksStore?.GetTasks(currentStore.selectedUser?.userId ?? '', currentStore!.id);
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
                      label="Название"
                      name="TribeName"
                    />
                    <TextInput
                      label="Описание"
                      name="TribeDescription"
                    />
                    <Button
                      disabled={isSubmitting}
                      text={tribesStore.state?.isLoading ? <Loader /> : 'Добавить'}
                    />

                  </TribeForm>
                )}
              </Formik>
            </TaskList>
          </ModalSearchWindow>
        )
      }
    </TribesListBody>
  );
});

export { TribeTaskList };
