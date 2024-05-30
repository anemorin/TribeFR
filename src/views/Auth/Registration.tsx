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
import { TitleType } from '../../types/commonTypes';
import { Loader } from '../../components/Loader';
import useStores from '../../hooks/useStores';
import ErrorModal from '../../components/ErrorModal';
import { runInAction } from 'mobx';
import SuccessStateStore from '../../stores/StateStores/SuccessStateStore';

const Registration : FC = () => {
  const { userStore } = useStores();
  const navigate = useNavigate();
  return (
    <PageBody>
      <Title
        text="Регистрация"
        type={TitleType.PageTitle}
      />

      <Formik
        initialValues={{
          email: '', password: '', repeatPassword: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          userStore.Register(values.email, values.password);
          if (userStore.token?.length) {
            navigate('/');
          }
          setSubmitting(false);
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Некорректная почта')
            .required('Поле обязательно для заполнения'),
          password: Yup
            .string()
            .matches(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
            .matches(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
            .matches(/[0-9]/, "Пароль должен содержать хотя бы одну цифру")
            .min(8, 'Пароль должен содержать как минимум 8 символов')
            .required('Поле обязательно для заполнения'),
          repeatPassword: Yup
            .string()
            .oneOf([Yup.ref('password'), undefined], 'Пароли должны совпадать')
            .required('Поле обязательно для заполнения'),
        })}
      >
        {({
          isSubmitting,
        }) => (
          <StyledForm>
            <TextInput
              label="Почта"
              name="email"
            />
            <TextInput
              label="Пароль"
              name="password"
              type="password"
            />
            <TextInput
              label="Повторите пароль"
              name="repeatPassword"
              type="password"
            />
            <Button
              disabled={isSubmitting}
              text={userStore.state?.isLoading ? <Loader /> : 'Зарегистрироваться'}
            />
          </StyledForm>
        )}
      </Formik>
      <AuthLink>
        Уже есть аккаунт?
        {' '}
        <Link to="/auth/login">Войти</Link>
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

export default observer(Registration);
