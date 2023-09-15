import styled from '@emotion/styled';

interface ICalendarTaskContainer {
  isDragOver: boolean;
}

export const CalendarTaskContainer = styled.div<ICalendarTaskContainer>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.dark6};
  padding: ${({ theme }) => theme.spacing(2)};
  gap: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.borderRadius(2)};
  min-height: 45px;

  :before {
    content: ${({ isDragOver }) => (isDragOver ? '<div></div>' : 'none')};
    margin-top: ${({ theme }) => theme.spacing(2)};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    min-height: 10px;
    background-color: ${({ theme }) => theme.colors.dark6};
    width: 100%;
    display: block;
  }
`;

export const CalendarTaskHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CalendarTaskTitle = styled.div`
  color: ${({ theme }) => theme.colors.primaryText};
`;
