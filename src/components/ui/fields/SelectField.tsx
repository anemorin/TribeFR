import { Field, useField } from 'formik';
import {
  FC, useState,
} from 'react';
import styled from 'styled-components';
import { icons } from '../../../enums';

export type OptionType = {
  value: string;
  label: string;
  [x: string]: string;
}

type Props = {
  id?: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  disable?: boolean;
  canEdit?: boolean;
  options: OptionType[];
  onInputChange?: (newValue: string) => void;
  onChangeValue?: (newValue: OptionType) => void;
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

const StyledInput = styled(Field)`
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

const SelectField : FC<Props> = ({
  label, options, disable = false, canEdit = true, ...props
}) => {
  const [field, meta] = useField(props);
  const [isDisabled, setIsDisabled] = useState(disable);

  return (
    <InputContainer
      hasError={meta.touched && !!meta.error}
    >
      <StyledLabel htmlFor={props.id || props.name}>{label}</StyledLabel>
      <InputBody>
        <StyledInput
          {...field}
          {...props}
          component="select"
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </StyledInput>
        {disable && canEdit && (
          <IconButton
            onClick={() => setIsDisabled(!isDisabled)}
            type="button"
          >
            {isDisabled ? (
              <Icon
                alt="Разблокировать поле"
                src={icons.edit}
              />
            ) : (
              <Icon
                alt="Заблокировать поле"
                src={icons.edit}
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

export default SelectField;
