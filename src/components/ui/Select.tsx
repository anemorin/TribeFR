import React, { useMemo } from 'react';
import Select, {
  GroupBase,
  SelectComponentsConfig,
  StylesConfig,
} from 'react-select';
import styled from 'styled-components';

const SelectContainer = styled.div`
  /* width: 70%; */
  width: 100%;
  height: 10%;
  z-index: 999999;
  color: 'black';
`;1

export interface OptionType {
  value: string;
  label: string;
  [x: string]: string;
}

export type ValueType = OptionType;

interface Props {
  isClearable: boolean;
  options: OptionType[];
  isSearchable: boolean;
  placeholder?: string;
  label?: string | React.ReactNode;
  onInputChange?: (newValue: string) => void;
  onChangeValue?: (newValue: OptionType) => void;
}

const CustomSelect: React.FC<Props> = ({
  options,
  isClearable,
  placeholder,
  label,
  onInputChange,
  onChangeValue,
}) => {
  const InputStyles: StylesConfig<OptionType | OptionType[], boolean> = {
    option: styles => ({
      ...styles,
      color: 'black',
      padding: '18px 10px',
      borderBottom: '1px solid black',
      zIndex: 999999,
    }),
  };

  const customComponents = useMemo(() => {
    const result: SelectComponentsConfig<
    OptionType | OptionType[],
    boolean,
    GroupBase<OptionType | OptionType[]>
    > = {};
    return result;
  }, []);

  return (
    <SelectContainer>
      <p>{label}</p>
      <Select
        components={customComponents}
        isClearable={isClearable}
        onChange={value => {
          if (onChangeValue) {
            onChangeValue(value as OptionType);
          }
        }}
        onInputChange={onInputChange}
        options={options}
        placeholder={placeholder}
        styles={InputStyles}
      />
    </SelectContainer>
  );
};

export default CustomSelect;
