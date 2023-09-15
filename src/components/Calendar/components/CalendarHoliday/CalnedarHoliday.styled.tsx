import styled from '@emotion/styled';

export const CalendarHolidayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
`;

export const CalendarHolidayItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.borderRadius(2)};
  background-color: ${({ theme }) => theme.colors.dark6};
`;

export const CalendarHolidayContent = styled.span`
  min-width: 45px;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
