import styled from '@emotion/styled';

export const CalendarDayContainer = styled.div`
  color: ${({ theme }) => theme.colors.primaryText};
  background-color: ${({ theme }) => theme.colors.dark1};

  &:hover {
    background-color: ${({ theme }) => theme.colors.dark2};
  }
`;
