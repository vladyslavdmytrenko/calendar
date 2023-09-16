import { FC, InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  ErrorMessage,
  Label,
  StyledInput,
} from '@components/InputField/InputField.styled.tsx';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isShowError?: boolean;
}

export const InputField: FC<InputFieldProps> = ({
  label,
  isShowError,
  ...props
}) => {
  const { name } = props;
  const { register, getFieldState } = useFormContext();
  const { isTouched, error } = getFieldState(name || '');

  return (
    <>
      {label && (
        <Label>
          {label} <StyledInput {...register(name || '')} {...props} />
        </Label>
      )}

      {!label && <StyledInput {...register(name || '')} {...props} />}

      {isShowError && isTouched && error && (
        <ErrorMessage>{error.message}</ErrorMessage>
      )}
    </>
  );
};
