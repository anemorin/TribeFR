import { FC } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import { Link, useNavigate } from 'react-router-dom';
import TextInput from '../../components/ui/fields/TextField';
import { Button } from '../../components/ui/Button';
import {
  AuthLink, PageBody, StyledForm,
} from './AuthStyles';
import Title from '../../components/ui/Title';

import UseStores from '../../hooks/useStores';
import { TitleType } from '../../types/commonTypes';
import { Loader } from '../../components/Loader';
import ErrorModal from '../../components/ErrorModal';
import { runInAction } from 'mobx';
import SuccessStateStore from '../../stores/StateStores/SuccessStateStore';

const Login : FC = () => {
  const { userStore } = UseStores();
  const navigate = useNavigate();
  return (
    <PageBody>
      <Title
        text="Bход"
        type={TitleType.PageTitle}
      />

      <Formik
        initialValues={{
          login: '', password: '',
        }}
        onSubmit={async (values, { setSubmitting }) => {
          await userStore.Login(values.login, values.password);
          console.warn(userStore.state);
          if (userStore.state?.isSuccess) {
            navigate('/');
          }
          setSubmitting(false);
        }}
        validationSchema={Yup.object({
          login: Yup.string().required('Поле обязательно для заполнения'),
          password: Yup.string().required('Поле обязательно для заполнения'),
        })}
      >
        {({
          isSubmitting,
        }) => (
          <StyledForm>
            <TextInput
              label="Имя пользователя"
              name="login"
            />
            <TextInput
              label="Пароль"
              name="password"
              type="password"
            />
            <Button
              disabled={isSubmitting}
              text={userStore.state?.isLoading ? <Loader /> : 'Войти'}
            />
          </StyledForm>
        )}
      </Formik>
      <AuthLink>
        Ещё нет аккаунта?
        {' '}
        <Link to="/auth/register">Регистрация</Link>
      </AuthLink>
      {
        userStore.state?.isError && (
          <ErrorModal
            onClose={() => {
              runInAction(() => {
                userStore.state = new SuccessStateStore();
              })
            }}
            state={userStore.state}
          />
        )
      }
    </PageBody>
  );
};

export default observer(Login);
