import styled from '@emotion/styled';

interface ICalendarDayContainer {
  isSelectedMonth: boolean;
}
export const CalendarDayContainer = styled.div<ICalendarDayContainer>`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${({ theme }) => theme.borderRadius(2)};
  min-height: 160px;
  max-height: 160px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${({ theme }) => theme.spacing(2)};
  gap: ${({ theme }) => theme.spacing(1)};
  color: ${({ theme }) => theme.colors.primaryText};
  background-color: ${({ isSelectedMonth, theme }) =>
    isSelectedMonth ? theme.colors.dark2 : theme.colors.dark7};
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.dark3};
  }
`;
