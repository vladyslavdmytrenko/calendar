import styled from '@emotion/styled';

import { EMOJI_SYMBOLS } from '@data-models/enums/emojis.enum.ts';

export const TaskForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.dark6};
  padding: ${({ theme }) => theme.spacing(2)};
  gap: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.borderRadius(2)};
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-left: auto;
  gap: ${({ theme }) => theme.spacing(1)};
`;

export const StyledLabelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(1)};
`;

interface IStyledCheckbox {
  color: string;
}
export const StyledCheckbox = styled.input<IStyledCheckbox>`
  width: 28px;
  height: 28px;
  position: relative;
  margin: 0;
  &:before {
    content: '';
    position: absolute;
    background-color: ${({ color }) => color};
    width: 28px;
    height: 28px;
  }
  &:checked::before {
    content: '${EMOJI_SYMBOLS.CHECK_MARK}';
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 28px;
    height: 28px;
  }
`;
