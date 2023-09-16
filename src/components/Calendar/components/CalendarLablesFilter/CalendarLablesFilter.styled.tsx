import styled from '@emotion/styled';

import { EMOJI_SYMBOLS } from '@data-models/enums/emojis.enum.ts';

export const CalendarLabelsFiltersContainer = styled.div`
  position: relative;
  width: 100%;
`;

interface ICalendarLabelsFiltersSelect {
  color?: string;
}
export const CalendarLabelsFiltersSelect = styled.div<ICalendarLabelsFiltersSelect>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius(2)};
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.dark7};
`;

interface ICalendarLabelsFiltersOptionContainer {
  isShow: boolean;
}
export const CalendarLabelsFiltersOptionContainer = styled.div<ICalendarLabelsFiltersOptionContainer>`
  box-sizing: border-box;
  position: absolute;
  top: 32px;
  display: ${({ isShow }) => (isShow ? 'flex ' : 'none')};
  flex-direction: column;
  width: 100%;
  gap: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.colors.dark7};
  color: ${({ theme }) => theme.colors.primaryText};
  border-radius: ${({ theme }) => theme.borderRadius(2)};
  padding: ${({ theme }) => theme.spacing(2)};
  z-index: ${({ theme }) => theme.zIndexes.modal};
`;

interface ICalendarLabelsFiltersOption {
  color: string;
  isSelected: boolean;
}
export const CalendarLabelsFiltersOption = styled.div<ICalendarLabelsFiltersOption>`
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 32px;
  min-height: 28px;
  background-color: ${({ color }) => color};

  &:before {
    content: ${({ isSelected }) =>
      isSelected ? `'${EMOJI_SYMBOLS.CHECK_MARK}'` : ''};
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    width: 28px;
    height: 28px;
  }
`;
