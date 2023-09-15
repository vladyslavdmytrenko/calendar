import styled from '@emotion/styled';

export const DayContainer = styled.div`
  display: grid;
  grid-gap: ${({ theme }) => theme.spacing(1)};
  grid-template-columns: repeat(7, minmax(8px, 1fr));
`;

export const CalendarDayName = styled.div`
  padding: ${({ theme }) => theme.spacing(1)};
  margin-block: ${({ theme }) => theme.spacing(2)};
`;
