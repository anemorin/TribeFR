import React from 'react';
import ModalSearchWindow from './Modal';
import { Button } from './ui/Button';
import StateBaseStore from '../stores/StateStores/StateStore';
import styled from 'styled-components';

interface Props {
  /** Кастомное сообщение ошибки */
  error?: string;
  /** Состояние стора */
  state?: StateBaseStore;
  /** Действие при выходе */
  onClose: () => void;
  /** Рисовать ли кнопку 'Закрыть' */
  withButton?: boolean;
  /** Кастомный title */
  title?: string;
}

const ErrorModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ErrorModal : React.FC<Props> = ({
  error,
  state,
  onClose,
  withButton,
  title = 'Ошибка',
}) => (
  (state?.isError) || !!error
    ? (
      <ModalSearchWindow
        onClose={onClose}
        title={title}
      >
        <ErrorModalContainer>
          <div>
            {state?.error ?? error ?? 'Произошла непредвиденная ошибка'}
          </div>
          {withButton && (
            <Button
              onClick={onClose}
              text='Закрыть'
            />
          )}
        </ErrorModalContainer>
      </ModalSearchWindow>
    ) : null
);

export default ErrorModal;
