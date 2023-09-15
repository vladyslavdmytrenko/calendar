import styled from '@emotion/styled';

import { BUTTON_TYPES } from '@data-models/enums/button.enum.ts';

interface IStyledButton {
  variant: BUTTON_TYPES;
}
export const StyledButton = styled.button<IStyledButton>`
  border: none;
  box-shadow: none;
  border-radius: ${({ theme }) => theme.borderRadius(2)};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 20px;
  position: relative;
  text-decoration: none;
  background-color: ${({ theme }) => theme.colors.dark2};
  color: ${({ theme }) => theme.colors.primaryText};
  cursor: pointer;

  height: ${({ theme, variant }) => {
    switch (variant) {
      case BUTTON_TYPES.ICON:
        return theme.spacing(7);

      default:
        return 'auto';
    }
  }};

  width: ${({ theme, variant }) => {
    switch (variant) {
      case BUTTON_TYPES.ICON:
        return theme.spacing(7);

      default:
        return '100%';
    }
  }};

  padding: ${({ theme, variant }) => {
    switch (variant) {
      case BUTTON_TYPES.ICON:
        return theme.spacing(0);

      default:
        return theme.spacing(2);
    }
  }};

  &:hover {
    background-color: #a6c5e229;
  }
`;
