import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { StyledButton } from './Button.styled.tsx';

import { BUTTON_TYPES } from '@data-models/enums/button.enum.ts';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: BUTTON_TYPES;
}

export const Button: FC<IButton> = ({
  children,
  variant = BUTTON_TYPES.TEXT,
  ...props
}) => {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
};
