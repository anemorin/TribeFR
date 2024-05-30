import { useField } from 'formik';
import {
  FC, useState,
} from 'react';
import { styled } from 'styled-components';
import { observer } from 'mobx-react';
import { icons } from '../../../enums';

type Props = {
  id?: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  disable?: boolean;
  canEdit?: boolean;
}

const InputContainer = styled.div<{hasError?: boolean}>`
  display: flex;
  flex-direction: column;
  color: ${(props) => (props.hasError ? 'red' : 'black')};
  gap: 4px;

  input {
    ${(props) => (props.hasError ? 'border-color: red' : '')};
  }
`;

const InputBody = styled.div`
  border-radius: 8px;
  border: 2px solid #d9d9d9;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
  padding: 12px;
`;

const StyledLabel = styled.label`
  font-size: 18px;
  font-weight: 600;
  padding: 0 0 4px 0;
`;

const IconButton = styled.button`
  background: none;
  border: none;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  display: flex;
  align-self: center;
  cursor: pointer;
`;

const TextInput : FC<Props> = ({
  label, type, disable = false, ...props
}) => {
  const [field, meta] = useField(props);
  const [seePassword, setSeePassword] = useState(type === 'password');

  const getType = () => {
    if (type === 'password' && seePassword) {
      return 'password';
    } if (type === 'password' && !seePassword) {
      return 'text';
    }
    return type;
  };

  return (
    <InputContainer
      hasError={meta.touched && !!meta.error}
    >
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <InputBody>
        <StyledInput
          {...field}
          {...props}
          disabled={disable}
          type={getType()}
        />
        {type === 'password' && (
          <IconButton
            onClick={() => setSeePassword(!seePassword)}
            type="button"
          >
            {seePassword ? (
              <Icon
                alt="Показать пароль"
                src={icons.openEye}
              />
            ) : (
              <Icon
                alt="Скрыть пароль"
                src={icons.closeEye}
              />
            )}
          </IconButton>
        )}
      </InputBody>
      {meta.touched && meta.error && (
        <div>{meta.error}</div>
      )}
    </InputContainer>
  );
};

export default observer(TextInput);
