import { FC, useEffect, useState } from 'react';
import useStores from '../hooks/useStores';
import { styled } from 'styled-components';
import { Icon } from './ui/Icon';
import { icons } from '../enums';
import Title from './ui/Title';
import { TitleType } from '../types/commonTypes';
import Splitter from './ui/Splitter';
import { Loader } from './Loader';
import { Button } from './ui/Button';
import ModalSearchWindow from './Modal';
import { Formik, Form } from 'formik';
import TextInput  from './ui/fields/TextField';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import { TribeItem } from './TribeItem';

const TribesListBody = styled.div`
  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  gap: 12px;
  padding: 16px 16px;
  border: 1px solid black;
  border-radius: 5px;
  height: 100%;
  min-height: 100%;
  width: 25%;
`;

const TribesItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
  padding: 8px 0;
`

const TribeItemBody = styled.div`
  display: flex;
  align-items: center;
  color: white;
  gap: 8px;
`;

const TribeForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  width: 100%;

  div {
    width: 100%;
  }
`


const TribesList : FC = () => {
  const { tribesStore, userStore } = useStores();
  const [ openModal, setOpenModal ] = useState(false);

  useEffect(() => {
    if (!tribesStore.tribes?.length && userStore.isAuthorized) {
      tribesStore.GetTribes();
    }
  }, [])

  return (
    <TribesListBody>
      <Title
        text={'Ваши трайбы'}
        type={TitleType.SubTitle}
      />
      <Splitter />
      <TribesItems>
        {
          tribesStore.state?.isLoading ?  <Loader /> :
            tribesStore.tribes?.length ? tribesStore.tribes?.map((tribe) => {
              return (
                <TribeItem
                  key={tribe.id}
                  id={tribe.id ?? ''}
                  tribeName={tribe.name ?? ''}
                />
              );
            }) : <p>Нет трайбов</p>
        }
      </TribesItems>
      <Button
        onClick={() => setOpenModal(true)}
        text={
          <TribeItemBody>
            <Icon
              icon={icons.plus}
              size={24}
            />
            Создать новый трайб
          </TribeItemBody>
        }
      />
      {
        openModal && (
          <ModalSearchWindow
            onClose={() => setOpenModal(false)}
            title={'Создать новый трайб'}
          >
            <Formik
              initialValues={{
                TribeName: '',
              }}
              onSubmit={async (values, { setSubmitting }) => {
                if (userStore.user?.id) {
                  await tribesStore.CreateTribe(
                    userStore.user?.id, values.TribeName
                  );
                }
                if (tribesStore.state?.isSuccess) {
                  tribesStore.GetTribes();
                }
                setOpenModal(false);
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
                  <Button
                    disabled={isSubmitting}
                    text={tribesStore.state?.isLoading ? <Loader /> : 'Создать'}
                  />
                </TribeForm>
              )}
            </Formik>
          </ModalSearchWindow>
        )
      }
    </TribesListBody>
  );
};

export default observer(TribesList);
