import { FC, useState } from 'react';
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
  justify-content: center;
  gap: 12px;
  width: 100%;
  min-height: 95%;
  overflow: hidden;
`;

const TribeTaskList : FC = observer(() => {
  const { userStore, tribesStore, tasksStore  } = UseStores();
  const [ showModal, setShowModal ] = useState(false);
  const [performer, setPerformer] = useState('');
  const currentStore = tribesStore.tribes?.find((tribe) => tribe.id === tribesStore.selectedTribeId);

  return (
    <TribesListBody>
      <TaskList>
        Таски
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
                isClearable={true}
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
                    await tasksStore.CreateTask(values.TribeName, values.TribeDescription, currentStore?.id, performer)
                  }
                  // await tribesStore.ChangeNameTribe(id, values.TribeName!);
                  // if (tribesStore.state?.isSuccess) {
                  //   tribesStore.GetTribes();
                  // }
                  // setShowModal(false);
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
