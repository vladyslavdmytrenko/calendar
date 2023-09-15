import { FC, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  ErrorMessage,
  Label,
  StyledInput,
} from '@components/InputField/InputField.styled.tsx';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const InputField: FC<InputFieldProps> = ({ label, ...props }) => {
  const { name } = props;
  const { register, getFieldState } = useFormContext();
  const { isTouched, error } = getFieldState(name || '');

  return (
    <>
      <Label>
        {label}

        <StyledInput {...register(name || '')} />
      </Label>

      {isTouched && error && <ErrorMessage>{error.message}</ErrorMessage>}
    </>
  );
};
